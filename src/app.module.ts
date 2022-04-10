import { Module } from '@nestjs/common';
import { DefaultModule } from './app/default/default.module';
import { ConsumerModule } from './app/consumer/consumer.module';
import { KafkaModule } from './app/common/kafka/kafka.module';

@Module({
  imports: [
    KafkaModule.register({
      clientId: 'rain-app-client',
      brokers: ['localhost:9092'],
      groupId: 'rain-app-group',
    }),
    DefaultModule,
    ConsumerModule,
  ],
})
export class AppModule {}
