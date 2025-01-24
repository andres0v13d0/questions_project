import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnswerDto {
  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsInt()
  @IsNotEmpty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  response: string;

  @IsString()
  @IsOptional()
  observation: string;
}

export class UpdateAnswerDto {
  @IsInt()
  @IsOptional()
  projectId?: number;

  @IsInt()
  @IsOptional()
  questionId?: number;

  @IsString()
  @IsOptional()
  response?: string;

  @IsString()
  @IsOptional()
  observation: string;
}
