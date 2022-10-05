import {
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { ReactNode } from "react";

interface SideBarLinkProps extends UnstyledButtonProps {
  label: string;
  icon: ReactNode;
  url: string;
  onClick?: () => void;
}

export default function SideBarLink({
  label,
  icon,
  url,
  onClick,
  ...props
}: SideBarLinkProps) {
  const theme = useMantineTheme();

  return (
    // <Tooltip label={label} position="right">
    <UnstyledButton
      sx={{
        width: "100%",
        color: theme.fn.primaryColor(),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      component={NextLink}
      href={url}
      onClick={onClick && onClick}
      {...props}
    >
      {icon}
      <Text size="xs" color={theme.colorScheme === "dark" ? "white" : "dark"}>
        {label}
      </Text>
    </UnstyledButton>
    // </Tooltip>
  );
}
