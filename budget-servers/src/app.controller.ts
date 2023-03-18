import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('transactions')
  getHello(): string {
    return 'hola';
  }
}
