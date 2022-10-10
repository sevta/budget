import {
  Button,
  Card,
  Center,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "src/common/utils/trpc";
import { z } from "zod";

export default function RegisterPage() {
  const { mutate, isError, error, isSuccess } = trpc.user.create.useMutation();

  const theme = useMantineTheme();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Partial<User>>({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: zodResolver(
      z.object({
        email: z.string().min(5),
        name: z.string().min(5),
        password: z.string().min(5),
      })
    ),
  });

  async function handleSubmit(values: Partial<User>) {
    setIsLoading(true);
    try {
      mutate({
        name: values.name || "",
        email: values.email || "",
        password: values.password || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isError) {
      showNotification({
        message: error?.message,
      });
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      showNotification({ message: "Success create new user" });
      router.push("/signin");
    }
  }, [isSuccess]);

  return (
    <Center
      sx={{
        minHeight: "100vh",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
      }}
    >
      <Card sx={{ width: 340 }}>
        <Title order={3}>Register</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack mt="sm">
            <TextInput
              autoComplete="off"
              autoCorrect="off"
              label="Username"
              {...form.getInputProps("name")}
            />
            <TextInput
              autoComplete="off"
              autoCorrect="off"
              type="email"
              label="Email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              {...form.getInputProps("password")}
            />
            <Group>
              <Button fullWidth type="submit" loading={isLoading}>
                Sign up
              </Button>
              <Button
                fullWidth
                variant="subtle"
                loading={isLoading}
                color="dark"
                onClick={() => router.push("/signin")}
              >
                Sign in
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>
    </Center>
  );
}
