import {
  AppShell,
  AppShellProps,
  LoadingOverlay,
  useMantineTheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SideBar from "./sidebar";

interface LayoutProps extends AppShellProps {
  showSideBar?: boolean;
}

export default function Layout({
  children,
  showSideBar = true,
  ...props
}: LayoutProps) {
  const theme = useMantineTheme();
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingOverlay visible />;
  }

  if (status === "unauthenticated") router.push("/signin");

  return (
    <AppShell
      sx={{
        backgroundColor:
          theme.colorScheme === "light"
            ? theme.fn.lighten(theme.colors.gray[1], 0.5)
            : theme.colors.dark[9],
      }}
      {...(showSideBar && {
        navbar: <SideBar />,
      })}
      {...props}
    >
      {children}
    </AppShell>
  );
}
