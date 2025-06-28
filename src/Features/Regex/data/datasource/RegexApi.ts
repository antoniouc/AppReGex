// aqui conectamos a la DB para obtener los datos de las expresiones regulares
import { insertToHistory, insertToFavorites, getHistory } from "../../../../services/database/TransactionsSQlite";
import { Regex } from "../../domain/entities/Regex";
export class RegexApi {
    async addToHistory(regex: Regex): Promise<Regex[]> {
        const result = await insertToHistory(regex);
        if (!result) {
            console.log("✅ Expresión regular agregada al historial");
        }
        return result || [];
    }
    async addToFavorites(regex: Regex): Promise<Regex[]> {
        const result = await insertToFavorites(regex);
        if (!result) {
            console.log("✅ Expresión regular agregada a favoritos");
        }
        return result || [];
    }
    async getHistory(): Promise<Regex[]> {
        const result = await getHistory();
        if (!result) {
            console.log("✅ Historial de expresiones regulares obtenido", result);
        }
        return result || [];
    }

}