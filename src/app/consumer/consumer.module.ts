import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, ConsumerService],
})
export class ConsumerModule {}
