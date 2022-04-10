import { Injectable, Inject } from '@nestjs/common';
import { KafkaService } from '@rob3000/nestjs-kafka';
import { RAINFALL_TOPIC } from '../constant';
import { ISendMessageParams } from '../default/interface';
import { customAlphabet } from 'nanoid';
import { PrismaService } from '../../prisma.service';
import { Event } from '@prisma/client';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as dayjs from 'dayjs';

const id = customAlphabet('1234567890abcdef', 20);

@Injectable()
export class DefaultService {
  constructor(
    @Inject('RAINFALL_SERVICE') private client: KafkaService,
    private prisma: PrismaService,
  ) {}

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

  streamEvents({ batchSize = 200 }) {
    let cursorId = undefined;
    const prisma = this.prisma;

    return new Readable({
      objectMode: true,
      async read() {
        try {
          const items = await prisma.event.findMany({
            take: batchSize,
            skip: cursorId ? 1 : 0,
            cursor: cursorId ? { id: cursorId } : undefined,
          });
          if (items.length === 0) {
            this.push(null);
          } else {
            for (const item of items) {
              this.push(item);
            }
            cursorId = items[items.length - 1].id;
          }
        } catch (err) {
          this.destroy(err);
        }
      },
    });
  }
}
