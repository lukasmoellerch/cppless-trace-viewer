export type Tree = undefined | boolean | Tree[];
export const treeApplyAtPath = (
  tree: Tree,
  path: number[],
  value: (oldValue: boolean) => boolean
) => {
  if (path.length === 0) {
    const booleanValue = tree ? true : false;
    return value(booleanValue);
  } else {
    const [head, ...tail] = path;
    const newTree = Array.isArray(tree) ? [...tree] : [];
    const prevValue = newTree[head];
    newTree[head] = treeApplyAtPath(prevValue, tail, value);
    return newTree;
  }
};

export const treeGetChild = (tree: Tree, index: number): Tree => {
  if (Array.isArray(tree)) {
    return tree[index];
  } else {
    return undefined;
  }
};
