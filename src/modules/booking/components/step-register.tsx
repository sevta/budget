import {
  Button,
  Grid,
  Group,
  Stack,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";

type Props = {};

export default function StepRegister({}: Props) {
  const [active, setActive] = useState<number>(0);
  const nextStep = () =>
    setActive((current: number) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="Daftar ketua regu"
          description="Daftar ketua regu"
          allowStepSelect={active > 0}
        >
          <Grid>
            <Grid.Col xs={6}>
              <Stack spacing="xs">
                <TextInput label="Nama ketua" />
                <TextInput label="Nomor identitas" />
                <TextInput label="Tempat lahir" />
                <DatePicker label="Tanggal lahir" />
              </Stack>
            </Grid.Col>
            <Grid.Col xs={6}>
              <Stack spacing="xs">
                <Textarea label="Alamat rumah" />
                <TextInput label="Nomor identitas" />
              </Stack>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Step
          label="Anggota rombongan"
          description="Anggota rombongan"
          allowStepSelect={active > 1}
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Kontak darutat"
          description="Kontak darutat"
          allowStepSelect={active > 2}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Step
          label="Data perlengkapan"
          description="Data perlengkapan"
          allowStepSelect={active > 3}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Step
          label="Data logistik"
          description="Data logistik"
          allowStepSelect={active > 4}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
