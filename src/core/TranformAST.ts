export type ASTNode =
  | { type: 'Char'; value: string }
  | { type: 'Concat'; children: ASTNode[] }
  | { type: 'Alternation'; left: ASTNode; right: ASTNode }
  | { type: 'Repetition'; quantifier: string; child: ASTNode }
  | { type: 'CharacterClass'; value: string };

export function transformRegexpTree(node: any): ASTNode | null {
  if (!node || typeof node !== 'object') return null;

  switch (node.type) {
    case 'Char':
      if (typeof node.value === 'string') {
        return { type: 'Char', value: node.value };
      }
      return null;

    case 'Alternative':
      if (!Array.isArray(node.expressions)) return null;
      const children = node.expressions
        .map(transformRegexpTree)
        .filter((n: ASTNode | null): n is ASTNode => !!n);
      if (children.length === 0) return null;
      return {
        type: 'Concat',
        children,
      };

    case 'Disjunction':
      if (!node.left || !node.right) {
        console.warn('Disjunction incompleta:', node);
        return null;
      }
      const left = transformRegexpTree(node.left);
      const right = transformRegexpTree(node.right);
      if (!left || !right) return null;
      return {
        type: 'Alternation',
        left,
        right,
      };

    case 'Repetition':
      if (!node.expression || !node.quantifier?.kind) return null;
      const child = transformRegexpTree(node.expression);
      if (!child) return null;
      return {
        type: 'Repetition',
        quantifier: node.quantifier.kind,
        child,
      };

    case 'Group':
      return transformRegexpTree(node.expression);

    case 'CharacterClass':
       console.log('EXPRESSIONS:', node.expressions);
       const chars = node.expressions?.map((e: any) => {
    if (e.type === 'ClassRange') {
      const from = e.from?.raw ?? e.from?.value ?? '';
      const to = e.to?.raw ?? e.to?.value ?? '';
      return `${from}-${to}`;
    }
    return e.raw ?? e.value ?? '';
  }).join('');
      return { type: 'CharacterClass', value: `[${chars}]` };



    default:
      console.warn('Nodo no reconocido:', node.type);
      return null;
  }
}
