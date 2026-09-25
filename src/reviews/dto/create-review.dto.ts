import { IsInt, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({ example: 'Nitro', description: 'Nom ou pseudonyme' })
    @IsString()
    authorName: string;

    @ApiProperty({ example: 4, minimum: 1, maximum: 5, description: 'La note doit être entre 1 et 5' })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ example: 'Calme et Wi-Fi stable.', minLength: 5, maxLength: 100, description: 'Le commentaire justifiant la note' })
    @IsString()
    @MaxLength(100)
    @MinLength(5)
    comment: string;
}
