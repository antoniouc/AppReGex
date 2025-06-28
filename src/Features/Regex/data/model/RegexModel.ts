export interface RegexModel {
  id: string;
  pattern: string;
  flags?: string; // opcional, puede ser "" o cosas como "g", "i", etc.
  status: "favorite" | "history"; 
  createdAt: string; // o Date si prefieres
}