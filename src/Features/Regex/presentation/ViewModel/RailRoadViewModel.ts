import { generateAST } from "../../../../core/RegexParse";
import { transformRegexpTree } from "../../../../core/TranformAST";
import { useRegexStore } from "../../../../Store/useRegexStore";
import type { ASTNode } from "../../../../core/TranformAST";

/**
 * Devuelve un AST transformado para el diagrama de ferrocarril.
 */
export const RailroadDiagramViewModel = (): ASTNode | null => {
    const pattern = useRegexStore((state) => state.pattern);
    let visualAST = null;
    try {
        const rawAST = generateAST(pattern);
        if (rawAST?.type === 'RegExp' && rawAST.body) {
            visualAST = transformRegexpTree(rawAST.body);
            if (visualAST) return visualAST;
        } else {
            console.warn("AST vacío o inválido");
            return null;
        }
    } catch (error) {
        console.warn("❌ Error generando AST para diagrama de ferrocarril:", error);
         visualAST = null;
    }
    return visualAST;
};
