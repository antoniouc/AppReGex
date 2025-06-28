// src/domain/entities/Regex.ts
export interface Regex {
  id: string;
  pattern: string;
  flags: string | null; // opcional, puede ser "" o cosas como "g", "i", etc.
  status: "favorite" | "history"; 
  createdAt: string; // o Date si prefieres
}