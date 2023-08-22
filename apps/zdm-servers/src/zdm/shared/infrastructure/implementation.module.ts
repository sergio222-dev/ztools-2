import { DynamicModule, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Implementation } from '@shared/infrastructure/implementation';

@Module({})
export class ImplementationModule {
  static async forRoot(implementation: Implementation): Promise<DynamicModule> {
    await ConfigModule.envVariablesLoaded;

    switch (implementation) {
      case Implementation.pg: {
        return {
          module: ImplementationModule,
          imports: [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: Number(configService.get<string>('POSTGRES_PORT')),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DB'),
                autoLoadEntities: true,
              }),
            }),
          ],
        };
      }
    }
  }
}
