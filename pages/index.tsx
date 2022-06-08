import { Box, createStyles, Group, ScrollArea, Slider } from "@mantine/core";
import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle";
import Hierarchy from "../components/Hierarchy";
import PasteButton from "../components/PasteButton";
import Timeline from "../components/Timeline";
import { layoutSpans } from "../utils/layout";
import { preprocessSpans, TracingData } from "../utils/preprocessing";
import { Tree, treeApplyAtPath, treeGetChild } from "../utils/tree";

import { FullScreenDropzone } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";

const colors = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "teal",
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
  },
  timelineAnchor: { display: "flex", position: "relative" },
  hierarchyWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "sticky",
    left: 0,
    paddingRight: "1rem",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.light[7],
    zIndex: 1,
  },
}));

const TimelinePage: NextPage = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState(500);
  const scale = 1 / (value * 1000);

  const [visible, setVisiblePaths] = useState<Tree>([]);
  const togglePath = useCallback((path: number[]) => {
    setVisiblePaths((v) => treeApplyAtPath(v, path, (oldValue) => !oldValue));
  }, []);

  const [data, setData] = useState<TracingData>({ spans: [] });

  const { layout, start } = useMemo(() => {
    const processedSpan = preprocessSpans(data.spans, colors);
    const layout = processedSpan.map((x) => layoutSpans(x));

    const start = processedSpan.reduce(
      (p, x) => Math.min(x.startTime, p),
      Infinity
    );
    return { layout, start };
  }, [data]);

  useEffect(() => {
    setVisiblePaths(layout.map(() => true));
  }, [layout]);

  const onStringData = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.spans) {
        setData(parsed);
      }
    } catch (e) {
      showNotification({
        title: "Error",
        message: "Invalid JSON",
      });
    }
  };

  const onFile = async (file: File) => {
    const res = new Response(file);
    const json = await res.text();
    onStringData(json);
  };

  return (
    <>
      <FullScreenDropzone
        accept={["application/json"]}
        onDrop={(files) => {
          for (const file of files) {
            onFile(file);
          }
        }}
      >
        {(x) => null}
      </FullScreenDropzone>
      <Box className={classes.wrapper}>
        <Group position="right" p={12}>
          <PasteButton onPaste={onStringData} />
          <Slider
            value={value}
            onChange={setValue}
            min={1}
            max={1000}
            sx={{ width: 400 }}
          />
          <ColorSchemeToggle />
        </Group>
        <ScrollArea
          style={{
            flexGrow: 1,
          }}
        >
          <Box className={classes.timelineAnchor}>
            <Box px={12} className={classes.hierarchyWrapper}>
              {layout.map((x, index) => (
                <Hierarchy
                  path={[index]}
                  key={index}
                  layout={x}
                  onToggle={togglePath}
                  visible={treeGetChild(visible, index)}
                />
              ))}
            </Box>
            <Box>
              <Box sx={{ position: "absolute" }}>
                {layout.map((x, index) => (
                  <Timeline
                    key={index}
                    path={[index]}
                    layout={x}
                    start={start}
                    scale={scale}
                    visible={treeGetChild(visible, index)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </ScrollArea>
      </Box>
    </>
  );
};

export default TimelinePage;
