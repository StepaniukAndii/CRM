import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  confirm_password: string;
}
