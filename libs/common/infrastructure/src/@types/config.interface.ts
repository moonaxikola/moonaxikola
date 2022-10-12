import { registerAs } from '@nestjs/config';
import { AnySchema } from 'joi';

export interface NestConfigExtension {
  variables: ReturnType<typeof registerAs>;
  validationSchema: Record<string, AnySchema>;
}
