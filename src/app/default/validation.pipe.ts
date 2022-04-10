import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(sourceValue: any, metadata: ArgumentMetadata) {
    const { value, error } = this.schema.validate(sourceValue);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value
  }
}
