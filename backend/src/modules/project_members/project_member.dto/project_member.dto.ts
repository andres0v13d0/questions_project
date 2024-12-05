import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateProjectMemberDto {
  @IsInt()
  @IsNotEmpty()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  memberName: string;
}

export class UpdateProjectMemberDto {
  @IsInt()
  @IsOptional()
  projectId?: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  memberName?: string;
}
