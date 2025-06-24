import { parse } from 'regexp-tree';

export const generateAST = (pattern: string) => {
  try {
    // Nota: aquí usamos "/" + pattern + "/" para simular una regex válida
    const ast = parse(`/${pattern}/`);
    return ast;
  } catch (error) {
    console.warn('Error al generar AST:', error);
    return null;
  }
};
