import { ActionIcon, createStyles, useMantineColorScheme } from "@mantine/core";
import { MoonIcon, SunIcon } from "@modulz/radix-icons";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.blue[6],
  },
}));

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="xl"
      className={classes.button}
    >
      {colorScheme === "dark" ? (
        <SunIcon width={20} height={20} />
      ) : (
        <MoonIcon width={20} height={20} />
      )}
    </ActionIcon>
  );
}
