import { Expose } from 'class-transformer';
import { IsDate } from 'class-validator';
import { IsResourceId } from '../validators';
import { IDto } from './i.dto';

/**
 * All model DTOs must have these fields.
 */
export class BaseModelDto implements IDto {
  @Expose()
  @IsResourceId()
  readonly id!: string;

  @Expose()
  @IsDate()
  readonly createdAt!: Date;

  @Expose()
  @IsDate()
  readonly updatedAt!: Date;
}
