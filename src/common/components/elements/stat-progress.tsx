import { Group, RingProgress, Text } from "@mantine/core";

export default function StatProgress() {
  return (
    <Group position="center">
      <RingProgress
        size={170}
        roundCaps
        thickness={16}
        label={
          <Text size="xs" align="center" px="xs" sx={{ pointerEvents: "none" }}>
            Hover sections to see tooltips
          </Text>
        }
        sections={[
          { value: 40, color: "cyan", tooltip: "Documents – 40 Gb" },
          { value: 25, color: "orange", tooltip: "Apps – 25 Gb" },
          { value: 15, color: "grape", tooltip: "Other – 15 Gb" },
        ]}
      />
    </Group>
  );
}
