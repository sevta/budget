import {
  Center,
  createStyles,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { IconLogout, IconSwitchHorizontal, TablerIcon } from "@tabler/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { menus } from "src/common/data";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  const iconConfig = {
    size: 22,
    ...(theme.colorScheme === "dark" && {
      color: "white",
    }),
  };
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} {...iconConfig} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const router = useRouter();

  const links = menus.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        router.push(link.url);
      }}
    />
  ));

  return (
    <Navbar height="100%" width={{ base: 80 }} p="md">
      <Center py="sm">
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={async () => await signOut({ callbackUrl: "/signin" })}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
