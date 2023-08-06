import { DynamicModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { ZdmModule } from '@zdm/zdm.module';

@Module({
  imports: [EventEmitterModule.forRoot(), ZdmModule],
  exports: [ZdmModule],
})
export class MainModule {
  static async forRoot(): Promise<DynamicModule> {
    await ConfigModule.envVariablesLoaded;

    return {
      module: MainModule,
    };
  }
}
