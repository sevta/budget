import { Paper, RingProgress, SimpleGrid, Text, Title } from "@mantine/core";
import { trpc } from "src/common/utils/trpc";

type Props = {};

export default function TransactionStat({}: Props) {
  const { data: accumulate } = trpc.transaction.accumulate.useQuery({
    withTotal: false,
  });

  return (
    <SimpleGrid cols={3}>
      <Paper p="md">
        {/* <Debugger data={accumulate} /> */}
        <Title order={3}>Total Accumulate</Title>

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
      </Paper>
    </SimpleGrid>
  );
}
