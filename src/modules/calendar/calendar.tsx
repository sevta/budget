import { Container, Title } from "@mantine/core";
import Layout from "src/common/components/layouts/layout";

type Props = {};

export default function Calendar({}: Props) {
  return (
    <Layout>
      <Container>
        <Title>Calendar</Title>
      </Container>
    </Layout>
  );
}
