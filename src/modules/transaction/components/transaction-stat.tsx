/* eslint-disable react-hooks/exhaustive-deps */
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
            <Text size="sm" color="dark.2" weight={500} align="center">
              Total Accumulate
            </Text>
            <Text align="center" weight={700}>
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
            <Text size="sm" color="dark.2" weight={500} align="center">
              Total pengeluaran
            </Text>
            <Text align="center" weight={700}>
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
                value: getTotalIncome < 0 ? 0 : getTotalIncome,
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
            <Text align="center" size="sm" color="dark.2" weight={500}>
              Total pemasukan
            </Text>
            <Text align="center" weight={700}>
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
            <Text size="sm" color="dark.2" weight={500}>
              Dana pinjaman
            </Text>
            <Text align="center" weight={700}>
              {formatRupiah(0)}
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
}
