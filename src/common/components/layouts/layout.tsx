import {
  ActionIcon,
  Affix,
  AppShell,
  AppShellProps,
  LoadingOverlay,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FiSettings } from "react-icons/fi";
import SideBar from "./sidebar";

interface LayoutProps extends AppShellProps {
  showSideBar?: boolean;
  showSettingsButton?: boolean;
}

export default function Layout({
  children,
  showSideBar = true,
  showSettingsButton = false,
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
      {showSettingsButton && (
        <Affix
          position={{
            bottom: 30,
            right: 50,
          }}
        >
          <Tooltip label="Settings">
            <ActionIcon
              radius="xl"
              size="xl"
              variant="filled"
              color={theme.fn.primaryColor()}
            >
              <FiSettings />
            </ActionIcon>
          </Tooltip>
        </Affix>
      )}
      {children}
    </AppShell>
  );
}
