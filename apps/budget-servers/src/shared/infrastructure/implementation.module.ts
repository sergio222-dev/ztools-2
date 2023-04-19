import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule } from './implementations/mongo.module';
import { Implementation } from './enum';

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
