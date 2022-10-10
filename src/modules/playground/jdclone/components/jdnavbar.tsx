/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Container,
  Group,
  HoverCard,
  Image,
  Stack,
  Text,
  TextInput,
  TextProps,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";

type Props = {
  onClick?: () => void;
} & TextProps;

function TopText({ children, onClick }: Props) {
  return (
    <Text
      sx={{ fontFamily: "Poppins", cursor: "pointer" }}
      size="sm"
      variant="link"
      color="dark"
      weight={600}
      onClick={onClick && onClick}
    >
      {children}
    </Text>
  );
}

export default function JdNavbar({}: Props) {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Box>
      <Container py="md" size="xl" fluid={false}>
        <Group position="apart">
          <Group>
            <TopText>Help & Contact Us</TopText>
            <TopText>Store Location</TopText>
            <TopText>Track My Order</TopText>
          </Group>
          <Group>
            <TopText>Help & Contact Us</TopText>
            <TopText>Store Location</TopText>
            <TopText>Track My Order</TopText>
            <TopText onClick={() => router.push("/dashboard")}>
              Dashboard
            </TopText>
          </Group>
        </Group>
        <Group py={30} position="apart">
          <UnstyledButton onClick={() => router.push("/playground/jdclone")}>
            <Image
              width={320}
              src="https://jdsports.id/static/logo/JDSport-logo-black.png"
            />
          </UnstyledButton>
          <Group>
            <Group spacing={0}>
              <TextInput
                radius={0}
                size="lg"
                sx={{ width: 320 }}
                styles={{
                  input: {
                    fontSize: 14,
                  },
                }}
              />
              <Button
                size="lg"
                radius={0}
                sx={{
                  backgroundColor: "#43d5b0",
                  fontSize: 13,
                  color: theme.black,
                }}
              >
                Search
              </Button>
            </Group>
            <TextInput
              size="lg"
              radius={0}
              disabled
              placeholder="Basket empty"
              sx={{ width: 250 }}
              styles={{
                input: {
                  fontSize: 13,
                  "&:disabled": {
                    background: "#cccccc",
                  },
                },
              }}
            />
          </Group>
        </Group>
        <Group position="center" spacing={40}>
          {[
            "Only ad JD",
            "Men",
            "Woman",
            "Kids",
            "Accessories",
            "Collections",
          ].map((item, index) => (
            <HoverCard
              key={index}
              withArrow
              openDelay={500}
              offset={10}
              arrowSize={12}
            >
              <HoverCard.Target>
                <Text
                  weight={600}
                  component={NextLink}
                  href="/playground/jdclone/product"
                  sx={{
                    fontFamily: "Poppins",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </Text>
              </HoverCard.Target>
              <HoverCard.Dropdown sx={{ width: "100%" }} p="lg">
                <Text color="dimmed" size="sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Necessitatibus dolores, dolore rem corporis eos aperiam dicta
                  magnam incidunt consequatur adipisci. Repellat, harum! Totam
                  inventore magnam beatae ex ipsa, necessitatibus dolores.
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          ))}
        </Group>
      </Container>
      <Box
        p="sm"
        sx={{
          backgroundColor: "#ffed06",
        }}
      >
        <Container>
          <Group position="apart" px={160}>
            {Array(3)
              .fill("")
              .map((_, index) => (
                <Stack spacing={0} align="center" key={index}>
                  <Text size="sm" weight={600} sx={{ fontFamily: "Poppins" }}>
                    Free Shipping IDR 10.000
                  </Text>
                  <Text size="xs" sx={{ fontFamily: "Poppins" }}>
                    Minimum Purchase 1 Mio
                  </Text>
                </Stack>
              ))}
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
