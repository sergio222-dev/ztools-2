import { DynamicModule, Module } from '@nestjs/common';

import { Implementation } from './enum';
import { MongoModule } from './implementations/mongo.module';

@Module({})
export class ImplementationModule {
  static register(implementation: Implementation): DynamicModule {
    let implementedModule;

    switch (implementation) {
      case Implementation.mongo: {
        implementedModule = MongoModule.register();
      }
    }

    return {
      module: ImplementationModule,
      imports: [implementedModule],
      exports: [implementedModule],
    };
  }
}
