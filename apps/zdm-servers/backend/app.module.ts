import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MainModule } from '../src/main.module';
import { EntityController } from './controller/v1/entity/Entity.controller';

const controllers = [EntityController];

const environmentFileName = `.${process.env.NODE_ENV || 'development'}.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environmentFileName,
    }),
    CqrsModule,
    MainModule,
  ],
  controllers: [...controllers],
})
export class AppModule {}
