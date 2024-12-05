import { IsEnum, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    coordinator: string;

    @IsNumber()
    @Min(0)
    score: number;

    @IsEnum(['APRUEBA', 'NO APRUEBA'])
    @IsNotEmpty()
    status: 'APRUEBA' | 'NO APRUEBA';

    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
}

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    @MaxLength(255)
    name?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    coordinator?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    score?: number;

    @IsEnum(['APRUEBA', 'NO APRUEBA'])
    @IsOptional()
    status?: 'APRUEBA' | 'NO APRUEBA';

    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
}
