import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MainModule } from '../src/main.module';
import { EntityController } from './controller/v1/entity/Entity.controller';
import { EntityObjectController } from './controller/v1/entity/EntityObject.controller';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserController } from './controller/v1/user/User.controller';
import { JWT_CONSTANTS } from './utils/constants';
import { JwtAuthGuard } from './middleware/guard/JwtAuthGuard';

const controllers = [EntityController, EntityObjectController, UserController];

// const environmentFileName = `.env.${process.env.NODE_ENV || 'local'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: environmentFileName,
      ignoreEnvFile: true,
      isGlobal: true,
      load: [JWT_CONSTANTS],
    }),
    CqrsModule,
    MainModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [...controllers],
})
export class AppModule {}
