import { RegexRepository } from "../../domain/repositories/RegexRepository";
import { RegexApi } from "../datasource/RegexApi";
import { Regex } from "../../domain/entities/Regex";

export class RegexRepositoryImpl implements RegexRepository {
    

    constructor( private readonly regexApi: RegexApi) {
       
    }

    async create(regex: Regex): Promise<void> {
        if(regex.status === "history") {
            await this.regexApi.addToHistory(regex);
        }
    }

    async getHistory(): Promise<Regex[]> {
        const rows = await this.regexApi.getHistory();
        return rows.map((row, index) => ({
      id: String(index),
      pattern: row.pattern,
      status: "history",
        flags: row.flags || null, // Asegúrate de que 'flags' sea opcional
      createdAt: row.createdAt
    }));
    }

  
}