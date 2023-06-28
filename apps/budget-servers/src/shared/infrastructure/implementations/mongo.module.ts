import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import budget from '@budget/index';

const mongoSchemasModule = MongooseModule.forFeature(budget.schemas);

const mongoConnectionModule = async () => {
  // await for env loaded
  await ConfigModule.envVariablesLoaded;
  return MongooseModule.forRoot(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}`,
    {
      dbName: process.env.MONGO_INITDB_DATABASE,
      authSource: process.env.MONGO_AUTH_SOURCE,
    },
  );
};

@Module({})
export class MongoModule {
  static register(): DynamicModule {
    return {
      module: MongoModule,
      imports: [mongoConnectionModule(), mongoSchemasModule],
      providers: [...budget.mongoRepositories],
      exports: [...budget.mongoRepositories],
    };
  }
}
