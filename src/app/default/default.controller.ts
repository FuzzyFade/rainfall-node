import { Controller, Post, Body } from '@nestjs/common';
import { DefaultService } from './default.service';
import { ISendMessageParams } from './interface';

@Controller()
export class DefaultController {
  constructor(private readonly appService: DefaultService) {}

  @Post('/send/consumer')
  async sendToConsumer(@Body() params: ISendMessageParams) {
    return await this.appService.send(params);
  }
}
