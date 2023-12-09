import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateVersionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
