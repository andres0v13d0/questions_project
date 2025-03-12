import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrUpdateUserPDFDto {
  @IsNotEmpty()
  readonly userId: number;

  @IsOptional()
  readonly pdf?: Buffer;
}
