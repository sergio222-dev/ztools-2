import { Module } from '@nestjs/common';
import starter from './starter';

@Module({
  // imports: [ImplementationModule.register(Implementation.mongo)],
  providers: [...starter.services, ...starter.handlers],
})
export class MainModule {}
