import { useEffect, useState } from "react";
import { RegexRepositoryImpl } from "../../data/repositories_impl/RegexRepositoryImpl";
import { AddRegex } from "../../domain/Usecases/AddRegex";
import { Regex } from "../../domain/entities/Regex";
import { RegexApi } from "../../data/datasource/RegexApi";
import { isRegexValid } from "../../../../utils/RegexValidet";
export const RegexTextTesterViewModel = (Pattern: string, TextTest: string) => {
  const [matches, setMatches] = useState<string[]>([]);

  const regexApi = new RegexApi();
  const regexRepository = new RegexRepositoryImpl(regexApi);
  const addRegexUseCase = new AddRegex(regexRepository);

  // Solo guarda en historial cuando cambia Pattern
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Pattern.trim() !== "" && isRegexValid(Pattern)) {
        const newRegex: Regex = {
          id: "", // puedes asignar un UUID si gustas
          pattern: Pattern,
          status: "history",
          flags: "", // puedes agregar flags si es necesario
          createdAt: new Date().toISOString(),
        };
        addRegexUseCase.execute(newRegex);
      }
    }, 1500); // espera 1.5 segundos antes de guardar

    return () => clearTimeout(timeout); // limpia el debounce si se escribe rápido
  }, [Pattern]);

  // Evalúa coincidencias cada vez que cambia pattern o text
  useEffect(() => {
    try {
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
