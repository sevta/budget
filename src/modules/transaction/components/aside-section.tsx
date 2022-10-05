import {
  Aside,
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { IconFile, IconPrinter } from "@tabler/icons";
import { useSession } from "next-auth/react";
import TopBar from "./top-bar";

type Props = {};

export default function AsideSection({}: Props) {
  const { data: session } = useSession();
  const [showModalCancel, { toggle, open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Aside
      width={{ base: 350 }}
      sx={{
        borderWidth: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
      }}
    >
      <Modal opened={showModalCancel} onClose={close} withCloseButton={false}>
        <Textarea label="Alasan pembatalan" />
        <Button fullWidth mt="md">
          Batalkan
        </Button>
      </Modal>
      <TopBar shade={5}>
        <Group>
          <Avatar radius="xl" />
          <Stack spacing={0}>
            <Text weight={600}>{session?.user?.name}</Text>
            <Text transform="capitalize" size="sm">
              {session?.user?.role?.toLocaleLowerCase()}
            </Text>
          </Stack>
        </Group>
      </TopBar>

      <Box p="lg" sx={{ flex: 1 }}>
        <Group spacing={0} position="apart">
          <Text>Subtotal</Text>
          <Title order={4}>Rp 74.500.000</Title>
        </Group>
      </Box>

      <Box p="lg">
        <Stack spacing="xs" mt="lg">
          <Button fullWidth radius="xl" leftIcon={<IconFile size={16} />}>
            Simpan
          </Button>
          <Button fullWidth radius="xl" leftIcon={<IconPrinter size={16} />}>
            Cetak
          </Button>
          <Button
            variant="outline"
            fullWidth
            radius="xl"
            onClick={() =>
              openConfirmModal({
                title: <Text weight={500}>Batalkan transaksi</Text>,
                onConfirm() {
                  toggle();
                },
                labels: {
                  confirm: "Ya",
                  cancel: "Tidak",
                },
              })
            }
          >
            Batal
          </Button>
        </Stack>
      </Box>
    </Aside>
  );
}
