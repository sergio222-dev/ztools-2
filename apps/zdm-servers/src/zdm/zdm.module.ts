import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import zdm from '@zdm/index';
import { Implementation } from '@shared/infrastructure/implementation';
import { ImplementationHelper } from '@zdm/shared/infrastructure/implementation';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImplementationModule } from '@zdm/shared/infrastructure/implementation.module';

@Module({
  imports: [
    ImplementationModule.forRoot(Implementation.pg),
    TypeOrmModule.forFeature(zdm.schemas),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await ConfigModule.envVariablesLoaded;
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  providers: [
    ...zdm.services,
    ...zdm.handlers,
    ...ImplementationHelper.repositories(Implementation.pg),
  ],
  exports: [
    ...zdm.services,
    ...zdm.handlers,
    ...ImplementationHelper.repositories(Implementation.pg),
  ],
})
export class ZdmModule {}
