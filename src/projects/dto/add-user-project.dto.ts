import { IsArray, IsInt, ArrayMinSize } from 'class-validator';

export class AddUserProjectDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Le tableau doit contenir au moins un élément.' })
  @IsInt({
    each: true,
    message: 'Chaque élément du tableau doit être un entier.',
  })
  userIds: number[];
}
