import { Box, BoxProps, useMantineTheme } from "@mantine/core";

type Props = {
  shade?: number;
  fixed?: boolean;
} & BoxProps;

export default function TopBar({ children, fixed, shade = 7 }: Props) {
  const theme = useMantineTheme();

  return (
    <Box
      py="xs"
      px="lg"
      sx={{
        ...(fixed && {
          position: "fixed",
          top: 0,
          width: "100%",
        }),
        zIndex: 30,
        backgroundColor: theme.colors[theme.primaryColor][shade],
        color: theme.white,
        minHeight: 75,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}
