import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class RequestValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    try {
      // validateOrReject & plainToInstance to validate the incoming data
      await validateOrReject(plainToInstance(metatype, value));
    } catch (e) {
      // Format the message response to clients
      if (!(e instanceof Array)) throw e;
      const errors = e.map(errorItem => {
        if (!(errorItem instanceof ValidationError)) throw e;
        return errorItem;
      });
      const message = errors
        .map(error => Object.values(error.constraints))
        .join(', ');
      throw new Error(message);
    }
    return value;
  }
}
