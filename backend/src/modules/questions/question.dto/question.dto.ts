import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  itemId: number;
}

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @IsOptional()
  itemId?: number;
}
