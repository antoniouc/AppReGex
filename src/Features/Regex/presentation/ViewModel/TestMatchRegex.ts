import { useEffect, useMemo, useRef, useState } from "react";
import { RegexRepositoryImpl } from "../../data/repositories_impl/RegexRepositoryImpl";
import { AddRegex } from "../../domain/Usecases/AddRegex";
import { Regex } from "../../domain/entities/Regex";
import { RegexApi } from "../../data/datasource/RegexApi";
import { isRegexValid } from "../../../../utils/RegexValidet";

export const RegexTextTesterViewModel = (Pattern: string, TextTest: string) => {
  const [matches, setMatches] = useState<string[]>([]);

  // ✅ Solo se crea una vez
  const addRegexUseCase = useMemo(() => {
    const regexApi = new RegexApi();
    const regexRepository = new RegexRepositoryImpl(regexApi);
    return new AddRegex(regexRepository);
  }, []);

  // ✅ Este ref nos permite evitar registros duplicados si el mismo regex ya fue guardado
  const lastSavedPattern = useRef<string | null>(null);

  useEffect(() => {
    const trimmed = Pattern.trim();
    if (!trimmed || !isRegexValid(trimmed)) return;

    // ✅ Solo guarda si el patrón es diferente al último guardado
    if (lastSavedPattern.current === trimmed) return;

    const timeout = setTimeout(() => {
      const newRegex: Regex = {
        id: "",
        pattern: trimmed,
        status: "history",
        flags: "",
        createdAt: new Date().toISOString(),
      };
      addRegexUseCase.execute(newRegex);
      lastSavedPattern.current = trimmed; // ✅ Se actualiza el patrón guardado
    }, 1500);

    return () => clearTimeout(timeout);
  }, [Pattern, addRegexUseCase]);

  useEffect(() => {
    try {
      if (!Pattern.trim()) {
        setMatches([]);
        return;
      }

      const regex = new RegExp(Pattern, 'g');
      const found = TextTest.match(regex);
      setMatches(found || []);
    } catch (error) {
      setMatches([]);
      console.warn("Error al encontrar coincidencias", error);
    }
  }, [Pattern, TextTest]);

  return matches;
};
