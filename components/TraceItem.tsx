import {
  useMantineTheme,
  Card,
  Box,
  Text,
  createStyles,
  MantineTheme,
} from "@mantine/core";
import { ProcessedSpan } from "../utils/preprocessing";
import { nanosecondsToString } from "../utils/time";

const useStyles = createStyles((theme) => ({
  card: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "stretch",
    overflow: "hidden",

    top: 0,
    bottom: 0,
    boxSizing: "border-box",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  operationNameLabel: {
    overflow: "hidden",
    width: "100%",
    textOverflow: "ellipsis",
    lineHeight: 1.1,
  },
  timeLabel: {
    overflow: "hidden",
    width: "100%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    lineHeight: 1.1,
    display: "block",
  },
}));

const computeStyle =
  (color: string, s: number, e: number, scale: number, start: number) =>
  (theme: MantineTheme) => ({
    left: `${(s - start) * scale}px`,
    width: `${(e - s) * scale}px`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[color][9], 0.15)
        : theme.fn.rgba(theme.colors[color][1], 0.15),
    ["&:hover"]: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[color][9], 0.4)
          : theme.fn.rgba(theme.colors[color][1], 0.4),
    },

    border: `2px solid ${
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[color][9], 0.6)
        : theme.fn.rgba(theme.colors[color][9], 0.3)
    }`,
  });

export interface TraceItemProps {
  span: ProcessedSpan;
  scale: number;
  start: number;
}
const TraceItem: React.FC<TraceItemProps> = ({ scale, span, start }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <Card
      color={span.assignedColor}
      p={0}
      sx={computeStyle(
        span.assignedColor,
        span.startTime,
        span.endTime,
        scale,
        start
      )}
      className={classes.card}
    >
      <Box pl={13} pr={13} className={classes.contentWrapper}>
        <Text
          weight={800}
          className={classes.operationNameLabel}
          style={{
            color:
              theme.colorScheme === "dark"
                ? "white"
                : theme.colors[span.assignedColor][9],
          }}
        >
          {span.name}
        </Text>

        <Text weight={400} className={classes.timeLabel}>
          {nanosecondsToString(span.endTime - span.startTime)}
        </Text>
      </Box>
    </Card>
  );
};

export default TraceItem;
