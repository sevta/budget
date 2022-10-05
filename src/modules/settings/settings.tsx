import { Container, Paper, Switch, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Layout from "src/common/components/layouts/layout";
import useDarkMode from "src/common/hooks/useDarkMode";

type Props = {};

export default function Settings({}: Props) {
  const { value, toggleDarkMode } = useDarkMode();
  const [checked, setChecked] = useState(false);

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
          <Switch
            label="Darkmode"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
              toggleDarkMode();
            }}
          />
        </Paper>
      </Container>
    </Layout>
  );
}
