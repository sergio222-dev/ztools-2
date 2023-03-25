import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import budget from '@budget/index';

const mongoSchemasModule = MongooseModule.forFeature(budget.schemas);

const mongoConnectionModule = MongooseModule.forRoot(
  // TODO should be a env var
  'mongodb://root:example@localhost:27017/?authSource=admin',
  {
    dbName: 'ztools',
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
