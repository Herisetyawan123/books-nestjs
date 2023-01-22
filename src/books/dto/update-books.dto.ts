import { IsOptional } from 'class-validator';

export default class UpdateBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  category: string;
}
