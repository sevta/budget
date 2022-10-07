import {
  Center,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowUp } from "@tabler/icons";
import { formatRupiah } from "src/common/utils/formatRupiah";
import { trpc } from "src/common/utils/trpc";

type Props = {};

export default function TransactionStat({}: Props) {
  const { data: accumulate } = trpc.transaction.accumulate.useQuery({
    withTotal: false,
  });

  return (
    <SimpleGrid cols={3}>
      <Paper p="md">
        <Stack align="center">
          <RingProgress
            roundCaps
            label={
              <Text size="xs" align="center">
                Application data usage
              </Text>
            }
            sections={[
              { value: 40, color: "cyan" },
              { value: 15, color: "orange" },
              { value: 15, color: "grape" },
            ]}
          />
          <div>
            <Text align="center">Total Accumulate</Text>
            <Text size="xl" align="center" weight={600}>
              Total Accumulate
            </Text>
          </div>
        </Stack>
      </Paper>
      <Paper p="md">
        <Stack align="center">
          <RingProgress
            roundCaps
            thickness={12}
            sections={[{ value: 45, color: "pink" }]}
            label={
              <Center>
                <IconArrowUp size={22} stroke={1.5} />
              </Center>
            }
          />
          <Stack spacing={0}>
            <Text align="center">Total pengeluaran</Text>
            <Text align="center" size="xl" weight={600}>
              {formatRupiah(400000)}
            </Text>
          </Stack>
        </Stack>
      </Paper>
      <Paper p="md">
        <Stack align="center">
          <RingProgress
            roundCaps
            thickness={12}
            sections={[{ value: 75, color: "green" }]}
            label={
              <Center>
                <IconArrowUp size={22} stroke={1.5} />
              </Center>
            }
          />
          <Stack spacing={0}>
            <Text align="center">Total pemasukan</Text>
            <Text align="center" size="xl" weight={600}>
              {formatRupiah(400000)}
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
