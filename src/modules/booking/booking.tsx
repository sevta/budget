import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import StepRegister from "./components/step-register";

type Props = {};

export default function Booking({}: Props) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
      })}
    >
      <Container fluid={false} py="xl" sx={{ minHeight: "100vh" }} size="lg">
        <Card>
          <Title order={3}>Booking</Title>
        </Card>
        <Paper p="lg" mt="lg">
          <Title order={3}>Jadwal</Title>

          <Stack mt="sm">
            <DatePicker
              label="Pilih jadwal keberangkatan"
              dropdownPosition="bottom-start"
            />
            <Select
              label="Pilih tujuan keberangkatan"
              data={[
                {
                  label: "Gunung arjuno",
                  value: "arjuno",
                },
              ]}
            />
            <Button>Pilih</Button>
          </Stack>
        </Paper>

        <Card mt="lg">
          <Title order={3}>Daftar</Title>
          <Box mt="sm">
            <StepRegister />
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
