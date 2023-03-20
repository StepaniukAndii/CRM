import { BaseModel } from '../entities/base.model.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto extends BaseModel {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  confirm_password: string;
}
