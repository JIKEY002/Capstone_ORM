import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
