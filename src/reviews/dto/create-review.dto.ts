import { IsInt, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateReviewDto {
    @IsString()
    authorName: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @MaxLength(100)
    comment: string;
}
