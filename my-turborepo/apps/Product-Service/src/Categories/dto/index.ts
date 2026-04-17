import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  slug!: string;
}
