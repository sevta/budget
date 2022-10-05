/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Group,
  MANTINE_COLORS,
  Paper,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Category as CategoryType } from "@prisma/client";
import { IconTrashX } from "@tabler/icons";
import { DataTable } from "mantine-datatable";
import moment from "moment";
import { useEffect, useState } from "react";
import Debugger from "src/common/components/elements/debugger";
import Layout from "src/common/components/layouts/layout";
import { trpc } from "src/common/utils/trpc";
import { z } from "zod";

type Props = {};

const PAGE_SIZE = 4;

export default function Category({}: Props) {
  const utils = trpc.useContext();
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(1);
  const { data, isLoading } = trpc.category.list.useQuery();
  const { mutate, isSuccess } = trpc.category.create.useMutation();
  const { mutate: deleteMany, isSuccess: isSuccessDeleteManyCategory } =
    trpc.category.deleteMany.useMutation();
  const { mutate: deleteCategory, isSuccess: isSuccessDeleteCategory } =
    trpc.category.delete.useMutation();
  const [selectedRecords, setSelectedRecords] = useState<CategoryType[]>([]);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      color: theme.primaryColor,
    },

    validate: zodResolver(
      z.object({
        name: z.string().min(3),
        description: z.string().min(3),
        color: z.string(),
      })
    ),
  });

  async function handleSubmit(values: any) {
    mutate({
      name: values.name,
      description: values.description,
      color: values.color,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      utils.category.list.invalidate();
      showNotification({
        message: "Sukses menambahkan kategori",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDeleteCategory || isSuccessDeleteManyCategory) {
      utils.category.list.invalidate();
      showNotification({ message: "Sukses menghapus data" });
    }
  }, [isSuccessDeleteCategory, isSuccessDeleteManyCategory]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    setSkip(from);
  }, [page]);

  return (
    <Layout>
      <Title order={3}>Category</Title>
      {selectedRecords.length > 0 && (
        <Group mt="lg">
          <Button
            color="red"
            variant="outline"
            leftIcon={<IconTrashX size={16} />}
            onClick={() =>
              openConfirmModal({
                title: "Hapus semua data",
                onConfirm() {
                  deleteMany({
                    id: selectedRecords.map((item) => item.id),
                  });
                  setSelectedRecords([]);
                },
                labels: {
                  confirm: "Confirm",
                  cancel: "Cancel",
                },
              })
            }
          >
            Delete
          </Button>
        </Group>
      )}
      <Paper mt="lg" p="lg">
        <DataTable
          mt="sm"
          fetching={isLoading}
          records={data}
          highlightOnHover
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          columns={[
            {
              accessor: "no",
              width: 50,
              render(record) {
                return <span>{data!.indexOf(record) + 1}</span>;
              },
            },
            {
              accessor: "name",
            },
            {
              accessor: "description",
            },
            {
              accessor: "Date",
              render(record) {
                return (
                  <span>{moment(record?.createdAt).format("YYYY-MM-DD")}</span>
                );
              },
            },
            {
              accessor: "action",
              width: 180,
              render(record) {
                return (
                  <Group>
                    <Button
                      size="sm"
                      variant="subtle"
                      color="red"
                      compact
                      onClick={() =>
                        openConfirmModal({
                          title: "Hapus data",
                          onConfirm() {
                            deleteCategory({ id: record.id });
                          },
                          labels: {
                            confirm: "Confirm",
                            cancel: "Cancel",
                          },
                        })
                      }
                    >
                      delete
                    </Button>
                    <Button variant="light" size="sm" compact>
                      edit
                    </Button>
                  </Group>
                );
              },
            },
          ]}
        />
      </Paper>
      <Paper p="lg" mt="lg">
        <Debugger data={MANTINE_COLORS} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Nama" {...form.getInputProps("name")} />
            <Textarea
              label="Deskripsi"
              {...form.getInputProps("description")}
            />
            <Select
              label="Color"
              defaultValue={theme.primaryColor}
              {...form.getInputProps("color")}
              data={[...MANTINE_COLORS, "primary"].map((item) => ({
                value: item,
                label: item,
                color: item,
              }))}
            />
          </Stack>
          <Group mt="lg">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Paper>
    </Layout>
  );
}
