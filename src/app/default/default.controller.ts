import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Response,
} from '@nestjs/common';
import { DefaultService } from './default.service';
import { Response as Res } from 'express';
import { rainfallScheme, ISendMessageParams } from './interface';
import { JoiValidationPipe } from './validation.pipe';
import * as csv from 'fast-csv';

@Controller()
export class DefaultController {
  constructor(private readonly appService: DefaultService) {}

  @Post('/send/consumer')
  @UsePipes(new JoiValidationPipe(rainfallScheme))
  async sendToConsumer(@Body() params: ISendMessageParams) {
    return await this.appService.send(params);
  }

  @Get('/download')
  async getDownloadData(@Response() res: Res) {
    res.setHeader('Content-Type', 'attachment; filename=data.csv');
    res.setHeader('Content-disposition', 'text/csv');

    const csvStream = csv.format({ headers: true });

    csvStream.pipe(res);

    for await (const event of this.appService.streamEvents({
      batchSize: 200,
    })) {
      csvStream.write(event);
    }
    csvStream.end();
  }
}
