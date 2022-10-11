import {
  Button,
  Container,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconPlus } from "@tabler/icons";
import Layout from "src/common/components/layouts/layout";
import ModalListClient from "./components/modal-list-client";

type Props = {};

export default function Invoice({}: Props) {
  const theme = useMantineTheme();
  const [showModalClient, handlerShowModalClient] = useDisclosure(false);

  return (
    <Layout>
      <Modal
        opened={showModalClient}
        onClose={handlerShowModalClient.close}
        withCloseButton={false}
      >
        <ModalListClient />
      </Modal>
      <Container fluid={false} size="lg">
        <Title order={3}>Create new invoice</Title>

        <Paper mt="lg" withBorder={false} sx={{ overflow: "hidden" }}>
          <SimpleGrid cols={2} p="lg">
            <div>
              <Group position="apart">
                <Text color="dark.1" weight={600}>
                  From
                </Text>
                <Button
                  variant="subtle"
                  compact
                  leftIcon={<IconPencil size={16} />}
                  onClick={handlerShowModalClient.open}
                >
                  change
                </Button>
              </Group>
              <Stack mt="xs" spacing={0}>
                <Text size="sm" weight={600}>
                  Jayvion Simon
                </Text>
                <Text size="sm" color="dark.3">
                  19034 Verna Unions Apt. 164 - Honolulu, RI / 87535 Phone:
                  365-374-4961
                </Text>
              </Stack>
            </div>
            <div>
              <Group position="apart">
                <Text color="dark.1" weight={600}>
                  To
                </Text>
                <Button
                  compact
                  variant="subtle"
                  leftIcon={<IconPlus size={16} />}
                >
                  add
                </Button>
              </Group>
              <Stack mt="xs" spacing={0}>
                <Text size="sm" weight={600}>
                  Jayvion Simon
                </Text>
                <Text size="sm" color="dark.3">
                  19034 Verna Unions Apt. 164 - Honolulu, RI / 87535 Phone:
                  365-374-4961
                </Text>
              </Stack>
            </div>
          </SimpleGrid>
          <SimpleGrid
            p="lg"
            cols={4}
            // sx={{ backgroundColor: theme.colors["gray"][0] }}
          >
            <TextInput placeholder="invoice number" />
            <TextInput placeholder="invoice number" />
            <TextInput placeholder="invoice number" />
            <TextInput placeholder="invoice number" />
          </SimpleGrid>
        </Paper>
        <Group position="right" mt="sm">
          <Button variant="light">Save as draft</Button>
          <Button>Create & Send</Button>
        </Group>
      </Container>
    </Layout>
  );
}
