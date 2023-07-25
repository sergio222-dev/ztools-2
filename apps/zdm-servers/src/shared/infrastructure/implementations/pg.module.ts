import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import zdm from '@zdm/index';

const pgSchemasModule = TypeOrmModule.forFeature(zdm.schemas);

const pgConnectionModule = async () => {
  await ConfigModule.envVariablesLoaded;
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [...zdm.schemas],
    autoLoadEntities: true,
  });
};

@Module({})
export class PgModule {
  static register(): DynamicModule {
    return {
      module: PgModule,
      imports: [pgConnectionModule(), pgSchemasModule],
      providers: [...zdm.pgRepositories],
      exports: [...zdm.pgRepositories],
    };
  }
}
