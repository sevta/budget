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
import { NavbarMinimal } from "./navbar-minimal";
import SideBar from "./sidebar";

type SidebarType = "minimal" | "default";

interface LayoutProps extends AppShellProps {
  showSideBar?: boolean;
  showSettingsButton?: boolean;
  sidebarType?: SidebarType;
}

export default function Layout({
  children,
  showSideBar = true,
  showSettingsButton = false,
  sidebarType,
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
            ? theme.fn.lighten(theme.colors[theme.primaryColor][1], 0.7)
            : theme.colors.dark[9],
      }}
      {...(showSideBar && {
        navbar: sidebarType === "default" ? <SideBar /> : <NavbarMinimal />,
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
