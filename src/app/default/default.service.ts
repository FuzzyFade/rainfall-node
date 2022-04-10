import { Injectable, Inject } from '@nestjs/common';
import { KafkaService } from '@rob3000/nestjs-kafka';
import { RAINFALL_TOPIC } from '../constant';
import { ISendMessageParams } from '../default/interface';
import { customAlphabet } from 'nanoid';
import * as dayjs from 'dayjs';

const id = customAlphabet('1234567890abcdef', 20);

@Injectable()
export class DefaultService {
  constructor(@Inject('RAINFALL_SERVICE') private client: KafkaService) {}

  async send(data: ISendMessageParams) {
    const body = {
      ...data,
      uploadtime: dayjs().format('D/M/YYYY HH:mm:ss.ms'),
    };

    const value = await this.client.send({
      topic: RAINFALL_TOPIC,
      messages: [
        {
          key: id() + dayjs().valueOf(),
          value: JSON.stringify(body),
        },
      ],
    });

    console.log('kafka status ', value);

    return body;
  }
}
