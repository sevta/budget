import { Button, LoadingOverlay, Paper, Text, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Layout from "src/common/components/layouts/layout";

export default function Dashboard() {
  const [fetch, setFetch] = useState(false);
  const { data } = useSession();

  return (
    <Layout>
      <LoadingOverlay visible={fetch} />
      <Title>Dashboard</Title>
      <Paper p="md" mt="lg">
        <Title weight={500} order={3}>
          Hi, {data?.user?.name}
        </Title>
        <Text color="dimmed" size="sm" mt="sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          unde pariatur cupiditate amet quo. Unde, veritatis. Optio modi minus
          saepe mollitia quo tenetur eum sequi nemo. Commodi deserunt
          voluptatibus nam?
        </Text>
        <Button mt="sm" variant="subtle" onClick={() => setFetch(true)}>
          Try fetch...
        </Button>
      </Paper>
    </Layout>
  );
}
