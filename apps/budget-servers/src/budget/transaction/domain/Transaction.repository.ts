import { Transaction } from './Transaction.aggregate';
import { Criteria } from '@shared/domain/criteria/Criteria';

export interface TransactionRepository {
    // findAll(userId: string): Promise<Transaction[]>;
    // findByIds(ids: string[], userId: string): Promise<Transaction[]>;
    // findOneById(id: string, userId: string): Promise<Transaction>;
    // findAllByAccountId(id: string, userId: string): Promise<Transaction[]>;
    // findAllBySubCategoryId(id: string, userId: string): Promise<Transaction[]>;
    save(value: Transaction): Promise<void>;
    delete(transactions: Transaction[]): Promise<void>;
    matching(criteria: Criteria): Promise<Transaction[]>;
}
