import {
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

interface SideBarLinkProps extends UnstyledButtonProps {
  label: string;
  icon: any;
  url: string;
  onClick?: () => void;
}

export default function SideBarLink({
  label,
  icon: Icon,
  url,
  onClick,
  ...props
}: SideBarLinkProps) {
  const theme = useMantineTheme();

  const iconConfig = {
    size: 22,
    ...(theme.colorScheme === "dark" && {
      color: "white",
    }),
  };

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
      <Icon {...iconConfig} />
      <Text size="xs" color={theme.colorScheme === "dark" ? "white" : "dark"}>
        {label}
      </Text>
    </UnstyledButton>
    // </Tooltip>
  );
}
