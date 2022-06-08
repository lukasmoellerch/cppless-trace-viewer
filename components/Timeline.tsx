import { Box } from "@mantine/core";
import { LayoutResult } from "../utils/layout";
import { Tree } from "../utils/tree";
import TraceRow from "./TraceRow";

export interface TimelineProps {
  path: number[];
  layout: LayoutResult;
  start: number;
  scale: number;
  visible: Tree | undefined;
}

const Timeline: React.FC<TimelineProps> = ({
  path,
  layout,
  start,
  scale,
  visible,
}) => {
  if (layout.type === "block") {
    return (
      <Box py={12}>
        <TraceRow row={[layout.span]} scale={scale} start={start} />
        {visible === false || visible === undefined
          ? null
          : layout.children.map((subLayout, index) => (
              <Timeline
                path={[...path, index]}
                key={index}
                layout={subLayout}
                start={start}
                scale={scale}
                visible={Array.isArray(visible) ? visible[index] : false}
              />
            ))}
      </Box>
    );
  } else {
    return (
      <>
        {layout.children.map((row, index) => (
          <TraceRow key={index} row={row} scale={scale} start={start} />
        ))}
      </>
    );
  }
};

export default Timeline;
