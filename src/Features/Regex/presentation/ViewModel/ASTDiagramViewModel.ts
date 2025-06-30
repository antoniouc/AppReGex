
import { generateAST } from "../../../../core/RegexParse";
import { transformRegexpTree } from "../../../../core/TranformAST";
import { useRegexStore } from "../../../../Store/useRegexStore";
import type { ASTNode } from "../../../../core/TranformAST";

export const ASTDiagramviewModel = ( ): ASTNode | null => {

    const pattern  = useRegexStore((state) => state.pattern);


   let visualAST = null;

    
        try{
            const rawAST = generateAST(pattern);
            console.log('AST generado:', rawAST);
            if(rawAST?.type === 'RegExp' && rawAST.body ) {
                visualAST = transformRegexpTree(rawAST.body);
                if (visualAST)  return visualAST;
            } else {
                console.warn('El AST no contiene nodos válidos');
                return null
            }
        } catch (error) {
            visualAST = null;
            console.warn('Error al generar el AST visual:', error);
        }
    
    return visualAST ;
}