import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MainModule } from '../src/main.module';

const controllers = [];

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
