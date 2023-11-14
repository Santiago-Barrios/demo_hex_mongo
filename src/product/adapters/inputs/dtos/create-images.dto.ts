import {IsArray, IsNumber, IsString, MinLength} from 'class-validator';

export class CreateImagesDto {
    @IsString({each: true})
    @IsArray()
    images: string[];
}
