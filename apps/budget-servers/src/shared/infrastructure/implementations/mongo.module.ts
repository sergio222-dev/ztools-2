import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import budget from '@budget/index';

const mongoSchemasModule = MongooseModule.forFeature(budget.schemas);

const mongoConnectionModule = MongooseModule.forRoot(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/?authSource=${process.env.MONGO_AUTH_SOURCE}`,
  {
    dbName: process.env.MONGO_INITDB_DATABASE,
  },
);

@Module({})
export class MongoModule {
  static register(): DynamicModule {
    return {
      module: MongoModule,
      imports: [mongoConnectionModule, mongoSchemasModule],
      providers: [...budget.mongoRepositories],
      exports: [...budget.mongoRepositories],
    };
  }
}
