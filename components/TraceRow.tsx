import { createStyles } from "@mantine/core";
import { ProcessedSpan } from "../utils/preprocessing";
import TraceItem from "./TraceItem";

const useStyles = createStyles((theme) => ({
  wrapper: { paddingTop: "0.3rem", paddingBottom: "0.3rem" },
  container: {
    position: "relative",
    height: "3.3rem",

    boxSizing: "border-box",
  },
}));

export interface TraceRowProps {
  row: ProcessedSpan[];
  scale: number;
  start: number;
}

const TraceRow: React.FC<TraceRowProps> = ({ scale, row, start }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {row.map((span, index) => (
          <TraceItem key={index} span={span} scale={scale} start={start} />
        ))}
      </div>
    </div>
  );
};
export default TraceRow;
