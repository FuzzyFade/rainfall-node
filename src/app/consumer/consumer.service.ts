import { Injectable } from '@nestjs/common';
import { SubscribeTo } from '../common/kafka/kafka.decorator';
import { KafkaPayload } from '../common/kafka/kafka.message';
import { RAINFALL_TOPIC } from '../constant';
import { PrismaService } from '../../prisma.service';
import { IConsumerRainfallData } from '../default/interface';

@Injectable()
export class ConsumerService {
  constructor(private prisma: PrismaService) {}

  @SubscribeTo(RAINFALL_TOPIC)
  async rainfallSubscriber(payload: string) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
    const data = JSON.parse(payload) as KafkaPayload;
    const body = data.body as IConsumerRainfallData;

    console.log(body)

    const res = await this.prisma.event.create({
      data: {
        monitortime: body.monitortime,
        rainfall: body.rainfall,
        devicecode: body.devicecode,
        uploadtime: body.uploadtime,
      },
    });

    console.log('prisma log: ', res)
  }
}
