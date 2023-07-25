import { Module } from '@nestjs/common';
import zdm from './zdm';
import { ImplementationModule } from '@shared/infrastructure/implementation.module';
import { Implementation } from '@shared/infrastructure/implementation';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ImplementationModule.register(Implementation.pg),
    EventEmitterModule.forRoot(),
  ],
  providers: [...zdm.services, ...zdm.handlers],
  exports: [...zdm.services, ...zdm.handlers],
})
export class MainModule {}
