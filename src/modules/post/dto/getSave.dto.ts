import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetSaveDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
