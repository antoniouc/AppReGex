// creamos el repositorio de RegexRepository
import { Regex } from "../entities/Regex";

export interface RegexRepository {
  getFavorites(query:string): Promise<Regex[]>;
  getHistory(query: string): Promise<Regex[]>;
  getById(id: string): Promise<Regex | null>;
  create(regex: Regex): Promise<void>;
  update(regex: Regex): Promise<void>;
  delete(id: string): Promise<void>;
}