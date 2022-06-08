import { ProcessedSpan } from "./preprocessing";

const layoutInlineChildren = (roots: ProcessedSpan[]) => {
  const rows: ProcessedSpan[][] = [roots];
  let prevRow: ProcessedSpan[] = roots;
  while (prevRow.length > 0) {
    const row = [];
    for (const span of prevRow) {
      row.push(...span.childSpans);
    }
    rows.push(row);
    prevRow = row;
  }
  rows.pop();
  return rows;
};

export type LayoutResult =
  | {
      type: "inline";
      span: ProcessedSpan;
      children: ProcessedSpan[][];
    }
  | {
      type: "block";
      span: ProcessedSpan;
      children: LayoutResult[];
    };

export const layoutSpans = (span: ProcessedSpan): LayoutResult => {
  if (span.inlineChildren) {
    return {
      type: "inline",
      span,
      children: layoutInlineChildren(span.childSpans),
    };
  } else {
    const res: LayoutResult[] = [];
    const children = span.childSpans;
    // Sort
    children.sort((a, b) => b.startTime - a.startTime);
    for (const child of children) {
      res.push(layoutSpans(child));
    }
    return { type: "block", span, children: res };
  }
};
