import budget from '@budget/index';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const mongoSchemasModule = MongooseModule.forFeature(budget.schemas);

const mongoConnectionModule = async () => {
    // await for env loaded
    await ConfigModule.envVariablesLoaded;
    const mongoServer =
        process.env.MONGO_PROTOCOL === 'mongodb'
            ? `${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}`
            : process.env.MONGO_SERVER;
    const mongoString = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${mongoServer}`;

    return MongooseModule.forRoot(mongoString, {
        dbName: process.env.MONGO_INITDB_DATABASE,
        authSource: process.env.MONGO_AUTH_SOURCE,
    });
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
