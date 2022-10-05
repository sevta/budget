import {
  ActionIcon,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import moment from "moment";
import { ReactNode } from "react";
import TopBar from "./top-bar";

type Props = {
  rightSection?: ReactNode;
};

export default function TransactionTopBar({ rightSection }: Props) {
  const theme = useMantineTheme();

  return (
    <TopBar fixed>
      <Group position="apart">
        <Group>
          <ActionIcon
            variant="light"
            color={theme.fn.primaryColor()}
            radius="xl"
          >
            <IconChevronLeft />
          </ActionIcon>
          <Stack spacing={0}>
            <Title order={4}>Transaction outcome/income</Title>
            <Text size="xs">{moment().format("YYYY-MM-DD")}</Text>
          </Stack>
        </Group>
        {rightSection}
      </Group>
    </TopBar>
  );
}
