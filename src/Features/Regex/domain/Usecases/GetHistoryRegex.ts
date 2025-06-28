import { Regex } from "../entities/Regex";
import { RegexRepository } from "../repositories/RegexRepository";

export class GetHistoryRegex {
  constructor(private readonly regexRepository: RegexRepository) {}

  async execute(): Promise<Regex[]> {
    return this.regexRepository.getHistory();
  }
}