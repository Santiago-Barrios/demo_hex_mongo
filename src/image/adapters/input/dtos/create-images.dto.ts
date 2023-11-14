import {IsArray, IsString, MinLength} from 'class-validator';

export class CreateImagesDto {
    @IsString()
    url: string;

    @IsString()
    productId: string;
}
