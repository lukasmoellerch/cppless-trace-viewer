import {
  useMantineTheme,
  Box,
  UnstyledButton,
  ActionIcon,
  Text,
  createStyles,
} from "@mantine/core";
import { ChevronRightIcon, ChevronDownIcon } from "@modulz/radix-icons";
import { LayoutResult } from "../utils/layout";
import { Tree, treeGetChild } from "../utils/tree";

const useStyles = createStyles((theme) => ({
  blockWrapper: {
    paddingTop: 12,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "column",
  },
  blockLabel: {
    height: "3.3rem",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  blockLabelText: {
    overflow: "hidden",
    width: "100%",
    textOverflow: "ellipsis",
    lineHeight: 1.1,
  },
  blockChildWrapper: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
  },
  inlineOuterPlaceholder: {
    paddingTop: "0.3rem",
    paddingBottom: "0.3rem",
  },
  inlineInnerPlaceholder: {
    height: "3.3rem",
    display: "flex",
  },
  toggleChevron: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.3rem",
    height: "2.3rem",
  },
}));

export interface HierarchyProps {
  path: number[];
  layout: LayoutResult;
  visible: Tree | undefined;
  onToggle: (path: number[]) => void;
}

const Hierarchy: React.FC<HierarchyProps> = ({
  path,
  layout,
  visible,
  onToggle,
}) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  if (layout.type === "block") {
    return (
      <div className={classes.blockWrapper}>
        <div style={{ paddingTop: "0.3rem", paddingBottom: "0.3rem" }}>
          <UnstyledButton
            onClick={() => onToggle(path)}
            className={classes.blockLabel}
          >
            <Box className={classes.toggleChevron}>
              {visible === false || visible === undefined ? (
                <ChevronRightIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </Box>
            <Text
              weight={800}
              className={classes.blockLabelText}
              sx={{
                color:
                  theme.colorScheme === "dark"
                    ? "white"
                    : theme.colors[layout.span.assignedColor][9],
              }}
            >
              {layout.span.name}
            </Text>
          </UnstyledButton>
        </div>

        {visible === false || visible === undefined ? null : (
          <Box pl={12}>
            <Box className={classes.blockChildWrapper}>
              {layout.children.map((subLayout, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <Hierarchy
                    path={[...path, index]}
                    layout={subLayout}
                    visible={treeGetChild(visible, index)}
                    onToggle={onToggle}
                  />
                </div>
              ))}
            </Box>
          </Box>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {layout.children.map((_, index) => (
          <div key={index} className={classes.inlineOuterPlaceholder}>
            <div className={classes.inlineInnerPlaceholder} />
          </div>
        ))}
      </div>
    );
  }
};

export default Hierarchy;
