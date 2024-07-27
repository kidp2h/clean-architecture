import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/checkhealth')
  checkHealth() {
    return { message: 'Check health', status: 200 };
  }
}
