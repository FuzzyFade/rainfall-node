import { Injectable } from '@nestjs/common';
import { SubscribeTo } from '../common/kafka/kafka.decorator';
import { KafkaPayload } from '../common/kafka/kafka.message';
import { RAINFALL_TOPIC } from '../constant';

@Injectable()
export class ConsumerService {
  @SubscribeTo(RAINFALL_TOPIC)
  rainfallSubscriber(payload: KafkaPayload) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }
}
