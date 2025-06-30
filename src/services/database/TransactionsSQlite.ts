import SQLiteConnection from "./SqliteConection";
import { Regex } from "../../Features/Regex/domain/entities/Regex";

export const insertToHistory = async (regex: Regex): Promise<Regex[] | void> => {
  try {
    const db = await SQLiteConnection.getInstance();
    const statement = await db.prepareAsync(`INSERT INTO regex_histor (pattern, flags, createdAt) VALUES ($pattern, $flags, $createdAt)`);
    await statement.executeAsync({ $pattern: regex.pattern, $flags: regex.flags, $createdAt: regex.createdAt });
    await statement.finalizeAsync(); 
    console.log("✅ Registro insertado en historial");
  } catch (error) {
    console.error("❌ Error insertando en historial:", error);
  }
};
export const insertToFavorites = async (regex: Regex): Promise<Regex[] | void> => {
  try {
    const db = await SQLiteConnection.getInstance();
    const statement = await db.prepareAsync(`INSERT INTO regex_favorite (pattern, flags, createdAt) VALUES ($pattern, $flags, $createdAt)`);
    await statement.executeAsync({ $pattern: regex.pattern, $flags: regex.flags  , $createdAt: regex.createdAt });
    await statement.finalizeAsync(); // liberar recursos, importante
    console.log("✅ Registro insertado en favoritos");
  } catch (error) {
    console.error("❌ Error insertando en favoritos:", error);
  }
};
// Función para obtener el historial de expresiones regulares
export const getHistory = async (): Promise<Regex[]> => {
  try {
    const db = await SQLiteConnection.getInstance();
    const resultSet = await db.getAllAsync<Regex>(`SELECT pattern, createdAt FROM regex_histor ORDER BY createdAt DESC LIMIT 20`);
    
    return resultSet;
  } catch (error) {
    console.error("❌ Error obteniendo historial:", error);
    return [];
  }
};