export interface TracingSpan {
  parent: number;
  end_time: number;
  name: string;
  start_time: number;
  tags: Record<string, string | number>;
  inline_children: boolean;
}

export interface TracingData {
  spans: TracingSpan[];
}

export interface ProcessedSpan {
  childSpans: ProcessedSpan[];
  endTime: number;
  name: string;
  startTime: number;
  tags: Record<string, string | number>;
  inlineChildren: boolean;
  assignedColor: string;
}

export function preprocessSpans(
  spans: TracingSpan[],
  colors: string[]
): ProcessedSpan[] {
  const colorMap: Map<string, string> = new Map();
  let nextColor = 0;

  const result: ProcessedSpan[] = [];
  const roots: ProcessedSpan[] = [];
  for (const span of spans) {
    let color = colorMap.get(span.name);
    if (color === undefined) {
      color = colors[nextColor];
      colorMap.set(span.name, color);
      nextColor = (nextColor + 1) % colors.length;
    }

    const processedSpan: ProcessedSpan = {
      childSpans: [],
      endTime: span.end_time,
      name: span.name,
      startTime: span.start_time,
      tags: span.tags,
      inlineChildren: span.inline_children,
      assignedColor: color,
    };
    result.push(processedSpan);
  }
  for (let i = 0; i < result.length; i++) {
    const span = spans[i];
    if (span.parent === i) {
      roots.push(result[i]);
    } else {
      const parent = result[span.parent];
      parent.childSpans.push(result[i]);
    }
  }

  // Do this in reverse order to ensure that children are visited before their parents.
  for (let i = result.length - 1; i >= 0; i--) {
    const span = result[i];
    if (span.endTime === 0) {
      span.endTime = span.childSpans.reduce(
        (a, b) => Math.max(a, b.endTime),
        -Infinity
      );
    }
    if (span.startTime === 0) {
      span.startTime = span.childSpans.reduce(
        (a, b) => Math.min(a, b.startTime),
        Infinity
      );
    }
  }

  return roots;
}
