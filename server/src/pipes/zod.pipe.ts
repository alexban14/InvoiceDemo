import { Injectable, ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
    constructor(private schema: any) {}

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException(error.errors);
            }
            throw error;
        }
    }
}
