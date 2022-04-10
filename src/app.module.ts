import { Module } from '@nestjs/common';
import { DefaultModule } from './app/default/default.module';
import { ConsumerModule } from './app/consumer/consumer.module';
import { KafkaModule } from '@rob3000/nestjs-kafka';

@Module({
  imports: [
    DefaultModule,
    ConsumerModule,
    KafkaModule.register([
      {
        name: 'RAINFALL_SERVICE',
        options: {
          client: {
            clientId: 'rain-app-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'rain-app-group',
          },
        },
      },
    ]),
  ],
})
export class AppModule {}
