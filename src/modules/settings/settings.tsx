import { Container, Title } from "@mantine/core";
import Layout from "src/common/components/layouts/layout";

type Props = {};

export default function Settings({}: Props) {
  return (
    <Layout>
      <Container>
        <Title order={3}>Settings</Title>
      </Container>
    </Layout>
  );
}
