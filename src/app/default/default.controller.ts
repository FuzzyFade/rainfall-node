import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { DefaultService } from './default.service';
import { rainfallScheme, ISendMessageParams } from './interface';
import { JoiValidationPipe } from './validation.pipe';

@Controller()
export class DefaultController {
  constructor(private readonly appService: DefaultService) {}

  @Post('/send/consumer')
  @UsePipes(new JoiValidationPipe(rainfallScheme))
  async sendToConsumer(@Body() params: ISendMessageParams) {
    return await this.appService.send(params);
  }
}
