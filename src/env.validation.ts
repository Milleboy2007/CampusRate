import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, validateSync } from "class-validator";

class EnvVariable {
    @IsNumber()
    PORT: number;

    @IsString()
    DATA_FILE_PATH: string;
}

export function validate(config: Record<string, unknown>){
    const validConfig = plainToInstance(EnvVariable, config, {enableImplicitConversion: true});
    const errors = validateSync(validConfig, {skipMissingProperties: false});

    if(errors.length > 0) throw new Error(`.env mal configurer: \n${errors.toString()}`);
    
    return validConfig;
}