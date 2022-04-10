import { Injectable } from '@nestjs/common';
import { KafkaService } from '../common/kafka/kafka.service';
import { KafkaPayload } from '../common/kafka/kafka.message';
import { RAINFALL_TOPIC } from '../constant';
import { ISendMessageParams } from '../default/interface';
import { customAlphabet } from 'nanoid';
import * as dayjs from 'dayjs';

const id = customAlphabet('1234567890abcdef', 20);

@Injectable()
export class DefaultService {
  constructor(private readonly kafkaService: KafkaService) {}

  async send(data: ISendMessageParams) {
    const body = {
      ...data,
      uploadtime: dayjs().format('D/M/YYYY HH:mm:ss.ms'),
    };

    const payload: KafkaPayload = {
      messageId: id() + dayjs().valueOf(),
      body,
      messageType: 'rainfall.data',
      topicName: RAINFALL_TOPIC,
    };

    const value = await this.kafkaService.sendMessage(RAINFALL_TOPIC, payload);
    console.log('kafka status ', value);

    return body;
  }
}
