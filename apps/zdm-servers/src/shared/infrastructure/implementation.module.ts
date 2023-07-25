import { DynamicModule, Module } from '@nestjs/common';

import { Implementation } from './implementation';
import { PgModule } from '@shared/infrastructure/implementations/pg.module';

@Module({})
export class ImplementationModule {
  static register(implementation: Implementation): DynamicModule {
    let implementedModule;

    switch (implementation) {
      case Implementation.pg: {
        implementedModule = PgModule.register();
      }
    }

    return {
      module: ImplementationModule,
      imports: [implementedModule],
      exports: [implementedModule],
    };
  }
}
