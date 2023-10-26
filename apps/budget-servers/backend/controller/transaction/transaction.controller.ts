import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Injectable,
    Param,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TransactionCreateRequest } from '../../dto/Transaction/TransactionCreateRequest';
import { TransactionDeleteBatchRequest } from '../../dto/Transaction/TransactionDeleteBatchRequest';
import { TransactionFindAllByAccountResponse } from '../../dto/Transaction/TransactionFindAllByAccountResponse';
import { TransactionFindAllResponse } from '../../dto/Transaction/TransactionFindAllResponse';
import { TransactionFindOneByIdResponse } from '../../dto/Transaction/TransactionFindOneByIdResponse';
import { TransactionUpdateRequest } from '../../dto/Transaction/TransactionUpdateRequest';
import { AuthenticatedRequest } from '../../routes/AuthenticatedRequest';
import { TransactionCreateCommand } from '@budget/transaction/application/useCase/create/TransactionCreate.command';
import { TransactionDeleteCommand } from '@budget/transaction/application/useCase/delete/TransactionDelete.command';
import { TransactionDeleteBatchCommand } from '@budget/transaction/application/useCase/deleteBatch/TransactionDeleteBatch.command';
import { TransactionFindAllQuery } from '@budget/transaction/application/useCase/find/TransactionFindAll.query';
import { TransactionFindAllByAccountQuery } from '@budget/transaction/application/useCase/find/TransactionFindAllByAccount.query';
import { TransactionFindOneByIdQuery } from '@budget/transaction/application/useCase/findOne/TransactionFindOneById.query';
import { TransactionUpdateCommand } from '@budget/transaction/application/useCase/update/TransactionUpdate.command';
import { Transaction } from '@budget/transaction/domain/Transaction.aggregate';

@Controller('transaction')
@ApiTags('transactions')
@Injectable()
export class TransactionController {
    constructor(private readonly queryBus: QueryBus, private readonly commandBus: CommandBus) {}

    @Get()
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: 200,
        description: 'Get all transactions',
        type: [TransactionFindAllResponse],
    })
    async findAll(@Req() request: AuthenticatedRequest): Promise<TransactionFindAllResponse[]> {
        const { user } = request;
        const userId = user.sub;
        const transactions = await this.queryBus.execute<TransactionFindAllQuery, Transaction[]>(
            new TransactionFindAllQuery(userId),
        );
        return transactions.map(t => ({
            id: t.id,
            inflow: t.inflow.amount,
            outflow: t.outflow.amount,
            payee: t.payee,
            memo: t.memo,
            subCategoryId: t.subCategoryId,
            date: t.date.toISOString(),
            cleared: t.cleared,
            accountId: t.accountId,
        }));
    }

    @Get('account/:accountId')
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: 200,
        description: 'Get all transactions by accountId',
        type: [TransactionFindAllByAccountResponse],
    })
    async findAllByAccountId(
        @Param('accountId') accountId: string,
        @Req() request: AuthenticatedRequest,
    ): Promise<TransactionFindAllByAccountResponse[]> {
        const { user } = request;
        const query = new TransactionFindAllByAccountQuery(accountId, user.sub);
        const transactions = await this.queryBus.execute<TransactionFindAllByAccountQuery, Transaction[]>(
            query,
        );
        return transactions.map(t => ({
            id: t.id,
            inflow: t.inflow.amount,
            outflow: t.outflow.amount,
            payee: t.payee,
            memo: t.memo,
            subCategoryId: t.subCategoryId,
            date: t.date.toISOString(),
            cleared: t.cleared,
            accountId: t.accountId,
        }));
    }

    @Get(':id')
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: 200,
        description: 'Get a transaction by id',
        type: TransactionFindOneByIdResponse,
    })
    async findOneById(
        @Param('id') id: string,
        @Req() request: AuthenticatedRequest,
    ): Promise<TransactionFindOneByIdResponse> {
        const { user } = request;
        const query = new TransactionFindOneByIdQuery(id, user.sub);
        const transactionIsolated = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(
            query,
        );

        if (transactionIsolated.id === '')
            throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

        return {
            id: transactionIsolated.id,
            inflow: transactionIsolated.inflow.amount,
            outflow: transactionIsolated.outflow.amount,
            payee: transactionIsolated.payee,
            memo: transactionIsolated.memo,
            subCategoryId: transactionIsolated.subCategoryId,
            date: transactionIsolated.date.toISOString(),
            cleared: transactionIsolated.cleared,
            accountId: transactionIsolated.accountId,
        };
    }

    @Post()
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: 201,
    })
    async create(
        @Body() body: TransactionCreateRequest,
        @Req() request: AuthenticatedRequest,
    ): Promise<void> {
        const { user } = request;
        const command = new TransactionCreateCommand(
            body.id,
            body.inflow,
            body.outflow,
            body.payee,
            body.memo,
            body.subCategoryId,
            body.date,
            body.cleared,
            body.accountId,
            user.sub,
        );
        await this.commandBus.execute(command);
    }

    @Put()
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: 201,
    })
    async update(
        @Body() body: TransactionUpdateRequest,
        @Req() request: AuthenticatedRequest,
    ): Promise<void> {
        const { user } = request;
        const { id, inflow, outflow, payee, memo, subCategoryId, date, cleared, accountId } = body;
        const query = new TransactionFindOneByIdQuery(id, user.sub);

        const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

        if (transaction.id === '')
            throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

        const command = new TransactionUpdateCommand(
            id,
            user.sub,
            inflow,
            outflow,
            payee,
            memo,
            subCategoryId,
            date,
            cleared,
            accountId,
        );

        await this.commandBus.execute(command);
    }

    @Delete(':id')
    @ApiBearerAuth('JWT')
    async delete(@Param('id') id: string, @Req() request: AuthenticatedRequest): Promise<void> {
        const { user } = request;
        const query = new TransactionFindOneByIdQuery(id, user.sub);

        const transaction = await this.queryBus.execute<TransactionFindOneByIdQuery, Transaction>(query);

        if (transaction.id === '')
            throw new HttpException(`the transaction with id ${id} doesn't exists`, HttpStatus.NOT_FOUND);

        const command = new TransactionDeleteCommand(id, user.sub);

        await this.commandBus.execute(command);
    }

    @Post('/delete')
    @ApiBearerAuth('JWT')
    async deleteBatch(
        @Body() { ids }: TransactionDeleteBatchRequest,
        @Req() request: AuthenticatedRequest,
    ): Promise<void> {
        const { user } = request;
        try {
            const command = new TransactionDeleteBatchCommand(ids, user.sub);
            await this.commandBus.execute<TransactionDeleteBatchCommand>(command);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
