import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { access, readFile, writeFile } from "node:fs/promises";

@Injectable()
export class JsonService implements OnModuleInit{
    private readonly filePath: string;

    constructor(private configService: ConfigService){
        this.filePath = this.configService.get<string>('DATA_FILE_PATH')!;

        if(!this.filePath.endsWith('.json')) throw new Error(`Configuration invalide: DATA_FILE_PATH doit se terminer par '.json'. Chemin reçu : ${this.filePath}`)
    }

    async onModuleInit() {
        try{
            await access(this.filePath);
        } catch (error) {
            if ((error as any).code === 'ENOENT'){
                console.log(`Fichier introuvable à ${this.filePath}. Création automatique...`);
                await writeFile(this.filePath, JSON.stringify([]), 'utf-8')
            } else throw error;
        }

        try{
            const fileContent = await readFile(this.filePath, 'utf-8');
            JSON.parse(fileContent);
        } catch (error) {
            throw new Error(`Le fichier JSON à ${this.filePath} est corrompu ou invalide.`)
        }
    }

    async readAll<T>(): Promise<T>{
        try{
            const fileContent = await readFile(this.filePath, 'utf-8');
            return JSON.parse(fileContent);
        }catch (error){
            throw new InternalServerErrorException('Impossible de lire les données JSON.')
        }
    }

    async write<T>(data: T): Promise<void>{
        try{
            const jsonString = JSON.stringify(data, null, 2);
            await writeFile(this.filePath, jsonString, 'utf-8');
        }catch (error){
            throw new InternalServerErrorException('Impossible de sauvegarder les données JSON.');
        }
    }
}