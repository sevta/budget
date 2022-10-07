import {
  Center,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import { useMemo } from "react";
import { formatRupiah } from "src/common/utils/formatRupiah";
import { trpc } from "src/common/utils/trpc";

type Props = {
  totalIncome?: number;
  totalOutcome?: number;
  subTotal?: number;
};

export default function TransactionStat({
  totalIncome = 0,
  totalOutcome = 0,
  subTotal = 0,
}: Props) {
  const { data: accumulate } = trpc.transaction.accumulate.useQuery({
    withTotal: false,
  });

  const getTotalIncome = useMemo(() => {
    return ((totalIncome - totalOutcome) / subTotal) * 100;
  }, [totalIncome]);

  const getTotalOutcome = useMemo(() => {
    return (totalOutcome / totalIncome) * 100;
  }, [totalOutcome]);

  return (
    <SimpleGrid cols={4}>
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
              {formatRupiah(subTotal)}
            </Text>
          </div>
        </Stack>
      </Paper>
      <Paper p="md">
        <Stack align="center">
          <RingProgress
            roundCaps
            thickness={12}
            sections={[
              {
                value: getTotalOutcome,
                color: "pink",
                tooltip: Math.round((totalOutcome / totalIncome) * 100) + "%",
              },
            ]}
            label={
              <Center>
                <IconArrowDown size={22} stroke={1.5} />
              </Center>
            }
          />
          <Stack spacing={0}>
            <Text align="center">Total pengeluaran</Text>
            <Text align="center" size="xl" weight={600}>
              {formatRupiah(totalOutcome || 0)}
            </Text>
          </Stack>
        </Stack>
      </Paper>
      <Paper p="md">
        <Stack align="center">
          <RingProgress
            roundCaps
            thickness={12}
            sections={[
              {
                value: getTotalIncome < 100 ? 0 : getTotalIncome,
                color: "green",
                tooltip:
                  Math.round(((totalIncome - totalOutcome) / subTotal) * 100) +
                  "%",
              },
            ]}
            label={
              <Center>
                <IconArrowUp size={22} stroke={1.5} />
                <Text>{}</Text>
              </Center>
            }
          />
          <Stack spacing={0}>
            <Text align="center">Total pemasukan</Text>
            <Text align="center" size="xl" weight={600}>
              {formatRupiah(totalIncome || 0)}
            </Text>
          </Stack>
        </Stack>
      </Paper>
      <Paper p="md">
        <Stack align="center">
          <RingProgress
            roundCaps
            thickness={12}
            sections={[
              {
                value: 0,
                color: "purple",
                tooltip: "0%",
              },
            ]}
            label={
              <Center>
                <IconArrowUp size={22} stroke={1.5} />
              </Center>
            }
          />
          <Stack spacing={0}>
            <Text align="center">Dana pinjaman</Text>
            <Text align="center" size="xl" weight={600}>
              {formatRupiah(0)}
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
