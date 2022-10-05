import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "src/common/components/layouts/layout";

export default function Index() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/dashboard");
  // }, []);

  return (
    <Layout padding={0} showSideBar={false}>
      <Stack align="center" justify="center" sx={{ minHeight: "100vh" }}>
        <Title order={3}>Welcome to www</Title>
        <Group>
          <Text variant="link" component={NextLink} href="/booking">
            Booking
          </Text>
        </Group>
        <Button onClick={() => signOut()}>Logout</Button>
      </Stack>
    </Layout>
  );
}
