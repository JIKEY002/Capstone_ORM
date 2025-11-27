import { IsNotEmpty, IsNumber } from 'class-validator';

export class InfoDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
