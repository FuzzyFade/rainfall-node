import { Injectable, Inject } from '@nestjs/common';
import { KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { RAINFALL_TOPIC } from '../constant';
import { PrismaService } from '../../prisma.service';
import { IConsumerRainfallData } from '../default/interface';

@Injectable()
export class ConsumerService {
  constructor(
    @Inject('RAINFALL_SERVICE') private client: KafkaService,
    private prisma: PrismaService,
  ) {}

  onModuleInit(): void {
    this.client.subscribeToResponseOf(RAINFALL_TOPIC, this);
  }

  @SubscribeTo(RAINFALL_TOPIC)
  async rainfallSubscriber(data: any) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', data);

    const body = JSON.parse(data) as IConsumerRainfallData;

    const res = await this.prisma.event.create({
      data: body,
    });

    console.log('prisma log: ', res);
  }
}
