import { Box, Navbar, Stack, Title, useMantineTheme } from "@mantine/core";
import { IconSettings, IconWorldWww } from "@tabler/icons";
import { signOut } from "next-auth/react";
import { AiOutlinePoweroff, AiOutlineUsergroupDelete } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import SideBarLink from "./sidebar-link";

export default function SideBar() {
  const theme = useMantineTheme();

  const iconConfig = {
    size: 22,
    ...(theme.colorScheme === "dark" && {
      color: "white",
    }),
  };

  return (
    <Navbar
      width={{ base: 80 }}
      sx={{
        display: "flex",
        alignItems: "center",
        borderWidth: 0,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      }}
    >
      <Box
        sx={{
          minHeight: 75,
          width: "100%",
          background: theme.colors[theme.primaryColor][7],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.white,
        }}
      >
        <Title order={3}>L.A</Title>
      </Box>
      <Stack spacing="lg" mt="lg">
        <SideBarLink
          label="Home"
          icon={<HiOutlineHome {...iconConfig} />}
          url="/dashboard"
        />
        <SideBarLink
          label="Website"
          icon={<IconWorldWww {...iconConfig} />}
          url="/"
        />
        <SideBarLink
          label="Outgoing"
          icon={<AiOutlineUsergroupDelete {...iconConfig} />}
          url="/dashboard/outgoing"
        />
        <SideBarLink
          label="Category"
          icon={<AiOutlineUsergroupDelete {...iconConfig} />}
          url="/dashboard/category"
        />
        <SideBarLink
          label="Transaction"
          icon={<AiOutlineUsergroupDelete {...iconConfig} />}
          url="/dashboard/transaction"
        />
        <SideBarLink
          label="Settings"
          icon={<IconSettings {...iconConfig} />}
          url="/dashboard/settings"
        />
        <SideBarLink
          label="Logout"
          icon={<AiOutlinePoweroff {...iconConfig} />}
          url="#"
          onClick={async () => await signOut({ callbackUrl: "/signin" })}
        />
      </Stack>
    </Navbar>
  );
}
