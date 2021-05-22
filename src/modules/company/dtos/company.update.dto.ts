import { IdDto } from '@ear/common/dtos';
import { IsMaxLength, IsUndefinable } from '@ear/common/validators';
import { AddressNestedUpdateDto } from '@ear/modules/address/dtos';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsObject, ValidateNested } from 'class-validator';
import { Company } from '../company.model';

/**
 * Parameters for updating a Company.
 */
export class CompanyUpdateDto extends IdDto {
  @Expose()
  @Type(() => AddressNestedUpdateDto)
  @IsUndefinable()
  @IsObject()
  @ValidateNested()
  readonly address?: AddressNestedUpdateDto;

  @Expose()
  @IsUndefinable()
  @IsMaxLength(Company.limits.NAME_MAX_LENGTH)
  readonly name?: string;

  @Expose()
  @IsUndefinable()
  @IsEmail()
  @IsMaxLength(Company.limits.EMAIL_MAX_LENGTH)
  readonly email?: string;
}
