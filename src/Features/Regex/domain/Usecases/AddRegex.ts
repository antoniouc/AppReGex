import { Regex } from "../entities/Regex";
import { RegexRepository } from "../repositories/RegexRepository";

export class AddRegex {
    constructor(private readonly regexRepository: RegexRepository) {}
    
    async execute(regex: Regex): Promise<void> {
        // Validar el regex antes de agregarlo
        if (!regex.pattern) {
        throw new Error("El patrón del regex no puede estar vacío");
        }
        // Llamar al repositorio para crear el nuevo regex
        await this.regexRepository.create(regex);
    }
}