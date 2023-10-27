import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import budget from '@budget/index';

const mongoSchemasModule = MongooseModule.forFeature(budget.schemas);

const mongoConnectionModule = async () => {
    return MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            await ConfigModule.envVariablesLoaded;
            const connectionString = configService.get<string>('MONGO_STRING');
            return {
                uri: connectionString,
            };
        },
    });
};

// mongoString, {
//     dbName: process.env.MONGO_INITDB_DATABASE,
//     authSource: process.env.MONGO_AUTH_SOURCE,
// }

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
