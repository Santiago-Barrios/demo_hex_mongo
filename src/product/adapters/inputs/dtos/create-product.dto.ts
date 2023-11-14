import {IsArray, IsNumber, IsOptional, IsString, MinLength} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    price: number;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images: string[];
}
