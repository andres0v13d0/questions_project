import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class CreateOrUpdateUserDto {
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsIn(['normal', 'administrador'])
  readonly type_user?: 'normal' | 'administrador';

  @IsOptional()
  @IsBoolean()
  readonly is_deleted?: boolean;

  @IsOptional()
  readonly pdf?: Buffer;
}
