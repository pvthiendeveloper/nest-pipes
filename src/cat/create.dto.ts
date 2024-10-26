import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { z } from 'zod';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  phone?: string;
}

export const createCatSchema = z
  .object({
    name: z.string(),
    phone: z.string().optional(),
  })
  .required();

export type ZodCreateCatDto = z.infer<typeof createCatSchema>;
