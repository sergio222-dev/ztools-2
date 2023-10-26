import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ZodValidationPipe } from 'nestjs-zod';

import { AccountController } from './controller/account/account.controller';
import { CategoryController } from './controller/category/category.controller';
import { SubCategoryController } from './controller/subCategory/subCategory.controller';
import { TransactionController } from './controller/transaction/transaction.controller';
import { BUDGET, MONGO, SUPABASE } from './etc/settings';
import { SupabaseGuard } from './middleware/guard/Supabase.guard';
import { SupabaseService } from './services/SupabaseService';
import { BudgetModule } from '../src/budget.module';

const controllers = [TransactionController, CategoryController, SubCategoryController, AccountController];

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [SUPABASE, MONGO, BUDGET],
    }),
    CqrsModule,
    BudgetModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await ConfigModule.envVariablesLoaded;
        return {
          secret: configService.get<string>('SUPABASE_JWT') || '',
        };
      },
    }),
  ],
  controllers: [...controllers],
  providers: [
    SupabaseService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class AppModule {}
