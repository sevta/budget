import { Box, Navbar, Stack, Title, useMantineTheme } from "@mantine/core";
import { signOut } from "next-auth/react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { menus } from "src/common/data";
import SideBarLink from "./sidebar-link";

export default function SideBar() {
  const theme = useMantineTheme();

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
        {menus.map((menu, index) => (
          <SideBarLink {...menu} icon={menu.icon} key={index} />
        ))}
        <SideBarLink
          label="Logout"
          icon={AiOutlinePoweroff}
          url="#"
          onClick={async () => await signOut({ callbackUrl: "/signin" })}
        />
      </Stack>
    </Navbar>
  );
}
