import {
  Button,
  Card,
  Center,
  Divider,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { User } from "@prisma/client";
import { IconBrandGithub } from "@tabler/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";

export default function SignInPage() {
  const theme = useMantineTheme();
  const router = useRouter();
  const { data, status } = useSession();

  const form = useForm<Partial<User>>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(
      z.object({
        email: z.string().min(5),
        password: z.string().min(5),
      })
    ),
  });

  useEffect(() => {
    if (status !== "loading" && data) {
      router.push("/dashboard");
    }
  }, [status, data]);

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
      <LoadingOverlay visible={status === "loading"} />
      <Card sx={{ width: 340 }}>
        <Title order={3}>Login</Title>

        <Stack mt="sm">
          <TextInput
            type="email"
            label="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput label="Password" {...form.getInputProps("password")} />
          <Stack spacing="xs">
            <Button
              onClick={async () => {
                try {
                  const resp = await signIn("credentials", {
                    redirect: false,
                    email: form.values.email,
                    password: form.values.password,
                  });

                  if (resp?.ok) {
                    showNotification({
                      message: "Success login",
                    });
                    router.push("/dashboard");
                  } else {
                    showNotification({
                      message: resp?.error,
                    });
                  }
                  console.log(resp);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Sign in
            </Button>
            <Button
              sx={{
                backgroundColor: "#333",
                "&:hover": {
                  backgroundColor: theme.black,
                },
              }}
              leftIcon={<IconBrandGithub size={16} />}
            >
              Login with github
            </Button>
            <Divider label="or" labelPosition="center" />
            <Button variant="subtle" component={NextLink} href="/register">
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Center>
  );
}
