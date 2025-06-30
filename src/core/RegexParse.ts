import { parse } from 'regexp-tree';

export const generateAST = (pattern: string) => {
  try {
    // Escapar barras '/' para que no confundan el parser
    const escapedPattern = pattern.replace(/\//g, '\\/');
    const ast = parse(`/${escapedPattern}/`);
    return ast;
  } catch (error) {
    console.warn('Error al generar AST:', error);
    return null;
  }
};
