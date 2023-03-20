import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [TransactionsController],
})
export class AppModule {}
