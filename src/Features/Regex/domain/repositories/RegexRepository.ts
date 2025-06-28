// creamos el repositorio de RegexRepository
import { Regex } from "../entities/Regex";

export interface RegexRepository {
  /*getFavorites(query:string): Promise<Regex[]>;
  getById(id: string): Promise<Regex | null>;*/
  getHistory(): Promise<Regex[]>;
  create(regex: Regex): Promise<void>;
  // update(regex: Regex): Promise<void>;
  // delete(id: string): Promise<void>;
}