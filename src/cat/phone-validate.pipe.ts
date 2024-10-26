import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class PhoneValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new Error('Phone number is required');
    }
    if (value.length !== 10) {
      throw new Error('Phone number must be 10 digits');
    }
    return '+' + value; // Transform
  }
}
