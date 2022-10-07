import {
  Container,
  MantineColor,
  MANTINE_COLORS,
  Paper,
  Select,
  Stack,
  Switch,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Layout from "src/common/components/layouts/layout";
import useDarkMode from "src/common/hooks/useDarkMode";

type Props = {};

export default function Settings({}: Props) {
  const { value, toggleDarkMode } = useDarkMode();
  const [checked, setChecked] = useState(false);
  const [colorScheme, setColorScheme] = useLocalStorage<MantineColor>({
    key: "color-theme",
  });
  const [fontFamily, setFontFamily] = useLocalStorage({
    key: "font-theme",
  });

  useEffect(() => {
    if (value === "dark") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checked]);

  return (
    <Layout>
      <Container>
        <Title order={3}>Settings</Title>

        <Paper p="lg" mt="lg">
          <Stack>
            <Switch
              label="Darkmode"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                toggleDarkMode();
              }}
            />

            <Select
              label="Color scheme"
              defaultValue={colorScheme}
              value={colorScheme}
              onChange={(value) => setColorScheme(value || "primary")}
              data={[
                ...MANTINE_COLORS.map((d) => ({
                  value: d,
                  label: d,
                })),
                {
                  label: "primary",
                  value: "primary",
                },
              ]}
            />

            <Select
              label="Font family"
              defaultValue={fontFamily}
              value={fontFamily}
              onChange={(value) => setFontFamily(value || "Source Sans Pro")}
              data={[
                {
                  label: "Inter",
                  value: "Inter",
                },
                {
                  Label: "Source Sans Pro",
                  value: "Source Sans Pro",
                },
              ]}
            />
          </Stack>
        </Paper>
      </Container>
    </Layout>
  );
}
