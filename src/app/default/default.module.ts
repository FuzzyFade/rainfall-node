import { Module } from '@nestjs/common';
import { DefaultService } from './default.service';
import { DefaultController } from './default.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, DefaultService],
  controllers: [DefaultController],
})
export class DefaultModule {}
