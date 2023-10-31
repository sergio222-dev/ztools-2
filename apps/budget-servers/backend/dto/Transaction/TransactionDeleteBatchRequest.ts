import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'nestjs-zod/z';

const TransactionDeleteBatchRequestSchema = z.object({
    ids: z.array(z.string()).describe('Transaction ids'),
});

export class TransactionDeleteBatchRequest extends createZodDto(TransactionDeleteBatchRequestSchema) {}
