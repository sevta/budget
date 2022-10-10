import { Box, Container, Title } from "@mantine/core";
import JdNavbar from "./components/jdnavbar";

type Props = {};

export default function ProductDetails({}: Props) {
  return (
    <Box>
      <JdNavbar />
      <Container size="xl" py="lg" fluid={false}>
        <Title>Details</Title>
      </Container>
    </Box>
  );
}
