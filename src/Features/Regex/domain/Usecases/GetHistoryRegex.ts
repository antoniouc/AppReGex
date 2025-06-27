import { Regex } from "../entities/Regex";
import { RegexRepository } from "../repositories/RegexRepository";

export class GetHistoryRegex {
  constructor(private readonly regexRepository: RegexRepository) {}

  async execute(query: string): Promise<Regex[]> {
    return this.regexRepository.getHistory(query);
  }
}