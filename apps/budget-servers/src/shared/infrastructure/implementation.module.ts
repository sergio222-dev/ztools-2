import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule } from './implementations/mongo.module';
import { Implementation } from './enum';

@Module({})
export class ImplementationModule {
  static register(implementation: Implementation): DynamicModule {
    let implementedmodule;

    switch (implementation) {
      case Implementation.mongo: {
        implementedmodule = MongoModule.register();
      }
    }

    return {
      module: ImplementationModule,
      imports: [implementedmodule],
      exports: [implementedmodule],
    };
  }
}
