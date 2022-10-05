import {
  Button,
  Card,
  Center,
  Container,
  Group,
  NumberInput,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Budget, Status } from "@prisma/client";
import moment from "moment";
import { useEffect } from "react";
import StatProgress from "src/common/components/elements/stat-progress";
import Layout from "src/common/components/layouts/layout";
import { trpc } from "src/common/utils/trpc";
import { outgoingSchemaCreate } from "./outgoing.schema";

type OutgoingForm = {
  title: string;
  description: string;
  price: number;
};

export default function Outgoing() {
  const { mutateAsync, isSuccess } = trpc.outgoing.create.useMutation();
  const { data } = trpc.outgoing.list.useQuery();
  const { mutateAsync: deleteOutgoing } = trpc.outgoing.delete.useMutation();
  const utils = trpc.useContext();

  const form = useForm<OutgoingForm>({
    initialValues: {
      title: "",
      description: "",
      price: 0,
    },

    validate: zodResolver(outgoingSchemaCreate),
  });

  async function handleSubmit(values: OutgoingForm) {
    try {
      await mutateAsync({
        title: values.title,
        description: values.description,
        price: values.price,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        message: "success",
      });
      utils.outgoing.list.invalidate();
      form.reset();
    }
  }, [isSuccess]);

  return (
    <Layout>
      <Container>
        <Title>Outgoing</Title>
        <Center mt="lg">
          <StatProgress />
        </Center>
        <SimpleGrid cols={4} mt="lg">
          {data?.map((d: Partial<Budget>, i) => (
            <Card key={i}>
              <Text color="dimmed">{d.name}</Text>
              <Text size="sm" weight={500}>
                {moment(d.createdAt).format("YYYY-MM-DD")}
              </Text>
              <Button
                variant="subtle"
                color="red"
                compact
                onClick={() =>
                  openConfirmModal({
                    title: (
                      <Title order={3}>Are you sure want to delete?</Title>
                    ),
                    labels: {
                      confirm: "Ok",
                      cancel: "Cancel",
                    },
                    onConfirm: async () => {
                      await deleteOutgoing({
                        id: d.id || "",
                      });
                      utils.outgoing.list.invalidate();
                      showNotification({
                        message: "Success cancel outgoing",
                      });
                    },
                  })
                }
              >
                Delete
              </Button>
            </Card>
          ))}
        </SimpleGrid>
        <Card mt="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput label="Title" {...form.getInputProps("title")} />
              <Textarea
                label="Description"
                {...form.getInputProps("description")}
              />
              <NumberInput label="Price" {...form.getInputProps("price")} />
              <DatePicker label="Date" />
              <Radio.Group label="Status" defaultValue={Status.DRAFT}>
                {Object.keys(Status).map((item, index) => (
                  <Radio value={item} label={item.toLowerCase()} key={index} />
                ))}
              </Radio.Group>
              <Group>
                <Button type="submit">Save</Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Container>
    </Layout>
  );
}
