/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Aside,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Popover,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useInputState } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Item, ItemType } from "@prisma/client";
import { IconEditCircle, IconSettings, IconX } from "@tabler/icons";
import { DataTable } from "mantine-datatable";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "src/common/components/layouts/layout";
import { formatRupiah } from "src/common/utils/formatRupiah";
import { trpc } from "src/common/utils/trpc";
import TopBar from "./components/top-bar";
import TransactionStat from "./components/transaction-stat";
import TransactionTopBar from "./components/transaction-top-bar";
import { transactionCreateSchema } from "./transaction.schema";

type Props = {
  withTopBar?: boolean;
};

export default function Transaction({ withTopBar = true }: Props) {
  const theme = useMantineTheme();
  const [query, setQuery] = useInputState("");
  const { data: categories } = trpc.category.list.useQuery();
  const { data: items, isLoading } = trpc.transaction.list.useQuery({
    query,
  });
  const {
    mutate,
    isSuccess,
    isLoading: isLoadingCreate,
  } = trpc.transaction.create.useMutation();
  const { mutate: deleteMany, isSuccess: isSuccessDeleteMany } =
    trpc.transaction.deleteMany.useMutation();
  const { mutate: update, isSuccess: isSuccessUpdate } =
    trpc.transaction.update.useMutation();
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { data: accumulate } = trpc.transaction.accumulate.useQuery({
    withTotal: false,
  });

  const form = useForm<Partial<Item>>({
    initialValues: {
      id: "",
      categoryId: "",
      description: "",
      amount: 0,
      type: ItemType.OUTCOME,
    },

    validate: zodResolver(transactionCreateSchema),
  });

  async function handleSubmit(values: Partial<Item>) {
    try {
      if (isEditMode) {
        update({
          id: values.id,
          amount: values.amount || 0,
          categoryId: values.categoryId || "",
          type: values.type || ItemType.OUTCOME,
          description: values.description || "",
        });
      } else {
        mutate({
          amount: values.amount || 0,
          categoryId: values.categoryId || "",
          type: values.type || ItemType.OUTCOME,
          description: values.description || "",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  function getTotalAmount() {
    return items
      ?.map((item) =>
        item.type === "OUTCOME" ? -Math.abs(item.amount) : item.amount
      )
      .reduce((prev, current) => prev + current, 0);
  }

  function handleEdit(record: Partial<Item>) {
    setIsEditMode(true);
    form.setValues({
      id: record.id,
      categoryId: record.categoryId,
      description: record.description,
      amount: record.amount,
      type: record.type,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      utils.transaction.list.invalidate();
      utils.transaction.accumulate.invalidate();
      showNotification({
        message: "Sukses menambahkan data",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDeleteMany) {
      setSelectedRecords([]);
      utils.transaction.list.invalidate();
      utils.transaction.accumulate.invalidate();
      showNotification({
        message: "Sukses menghapus data",
      });
    }
  }, [isSuccessDeleteMany]);

  useEffect(() => {
    if (isSuccessUpdate) {
      form.reset();
      utils.transaction.list.invalidate();
      utils.transaction.accumulate.invalidate();
      setIsEditMode(false);
      showNotification({
        message: "Sukses update data",
      });
    }
  }, [isSuccessUpdate]);

  return (
    <Layout
      padding={0}
      aside={
        <Aside
          width={{ base: 400 }}
          sx={{
            border: 0,
            backgroundColor:
              theme.colorScheme === "light"
                ? theme.white
                : theme.colors.dark[7],
          }}
        >
          <TopBar shade={8}>
            <Group>
              <Avatar radius="xl" />
              <Stack spacing={0}>
                <Text weight={600}>{session?.user?.name}</Text>
                <Text transform="capitalize" size="sm">
                  {session?.user?.role?.toLocaleLowerCase()}
                </Text>
              </Stack>
            </Group>
          </TopBar>
          <Box p="lg">
            <Text weight={700} mb="lg" sx={{ fontSize: 23 }}>
              Create new outcome/income
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <Select
                  searchable
                  placeholder="Pick one"
                  label="Kategori"
                  {...form.getInputProps("categoryId")}
                  data={
                    categories?.map((d) => ({
                      label: d.name,
                      value: d.id,
                    })) || []
                  }
                />
                <Textarea
                  label="Deskripsi"
                  {...form.getInputProps("description")}
                />
                <NumberInput label="Amount" {...form.getInputProps("amount")} />
                <DatePicker label="Tanggal" defaultValue={new Date()} />
                <Radio.Group {...form.getInputProps("type")}>
                  {Object.keys(ItemType).map((item, index) => (
                    <Radio
                      key={index}
                      value={item}
                      label={item.toLowerCase()}
                    />
                  ))}
                </Radio.Group>
              </Stack>
              <Group mt="lg">
                {isEditMode ? (
                  <>
                    <Button type="submit" fullWidth size="md" radius="xl">
                      Update
                    </Button>
                    <Button
                      variant="light"
                      radius="xl"
                      fullWidth
                      size="md"
                      onClick={() => {
                        form.reset();
                        setIsEditMode(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    size="md"
                    radius="xl"
                    loading={isLoadingCreate}
                  >
                    Simpan
                  </Button>
                )}
              </Group>
            </form>
          </Box>
        </Aside>
      }
    >
      {withTopBar && <TransactionTopBar />}

      <Container py="lg" mt={70}>
        <TransactionStat />

        <Paper mt="lg" p="lg">
          <Group position="apart">
            <Title order={3}>Income/Outcome</Title>

            <Group mt="lg">
              {query && (
                <Badge
                  sx={{ paddingRight: 3 }}
                  variant="outline"
                  rightSection={
                    <ActionIcon onClick={() => setQuery("")}>
                      <IconX size={13} />
                    </ActionIcon>
                  }
                >
                  {query}
                </Badge>
              )}
              <Popover position="bottom-end" radius="lg">
                <Popover.Target>
                  <Button variant="light" leftIcon={<IconSettings size={16} />}>
                    Filter
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Title order={3}>Filter</Title>
                  <Group mt="sm" align="flex-end">
                    <TextInput
                      label="Search"
                      value={query}
                      onChange={setQuery}
                    />
                    <DatePicker label="from" />
                    <DatePicker label="to" />
                    <Button>Apply</Button>
                  </Group>
                </Popover.Dropdown>
              </Popover>
              <Button
                color="red"
                variant="outline"
                disabled={selectedRecords.length === 0}
                onClick={() =>
                  openConfirmModal({
                    title: "Hapus data",
                    labels: {
                      confirm: "Ya",
                      cancel: "Tidak",
                    },
                    onConfirm() {
                      deleteMany({
                        id: selectedRecords.map((item: Item) => item.id),
                      });
                    },
                  })
                }
              >
                Delete
              </Button>
            </Group>
          </Group>
          <DataTable
            mt="sm"
            striped
            records={items}
            highlightOnHover
            fetching={isLoading}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            columns={[
              {
                accessor: "no",
                width: 40,
                render(record) {
                  return <span>{items!.indexOf(record) + 1}</span>;
                },
              },
              {
                accessor: "description",
              },
              {
                accessor: "type",
                render(record) {
                  return (
                    <Badge
                      variant="filled"
                      color={record.type === ItemType.INCOME ? "green" : "#333"}
                    >
                      {record?.type.toLowerCase()}
                    </Badge>
                  );
                },
              },
              {
                accessor: "category",
                render(record) {
                  return (
                    <Group spacing="xs">
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: 20,
                          backgroundColor:
                            theme.colors[
                              record.category?.color || "primary"
                            ][6],
                        }}
                      />
                      <div>{record?.category?.name || "-"}</div>
                    </Group>
                  );
                },
              },
              {
                accessor: "Date",
                render(record) {
                  return (
                    <span>{moment(record.createdAt).format("YYYY-MM-DD")}</span>
                  );
                },
              },
              {
                accessor: "amount",
                width: 120,
                render(record) {
                  return (
                    <span>
                      {formatRupiah(
                        record.type === "OUTCOME"
                          ? -Math.abs(record?.amount)
                          : record.amount
                      )}
                    </span>
                  );
                },
              },
              {
                accessor: "Action",
                width: 60,
                render(record) {
                  return (
                    <Tooltip label="edit">
                      <ActionIcon
                        color={theme.fn.primaryColor()}
                        onClick={() => handleEdit(record)}
                      >
                        <IconEditCircle size={16} />
                      </ActionIcon>
                    </Tooltip>
                  );
                },
              },
            ]}
          />
          <Group position="apart" p="sm" mt="md">
            <Text weight={600}>Subtotal</Text>
            <Text weight={600}>{formatRupiah(getTotalAmount() || 0)}</Text>
          </Group>
        </Paper>
      </Container>
    </Layout>
  );
}
