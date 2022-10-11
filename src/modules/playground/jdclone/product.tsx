import {
  Accordion,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import JdNavbar from "./components/jdnavbar";
import ProductCard from "./components/product-card";

type Props = {};

export default function JDProduct({}: Props) {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Box>
      <JdNavbar />
      <Container fluid size="xl" py="lg">
        <Grid>
          <Grid.Col xs={3}>
            <Accordion>
              <Accordion.Item value="category">
                <Accordion.Control>
                  <Title order={5}>Category</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing={0}>
                    {Array(10)
                      .fill("")
                      .map((_, index) => (
                        <Radio
                          key={index}
                          value="biru"
                          label="Sneakers(175)"
                          size="sm"
                        />
                      ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="color">
                <Accordion.Control>
                  <Title order={5}>Color</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing={0}>
                    {Array(10)
                      .fill("")
                      .map((_, index) => (
                        <Radio
                          key={index}
                          value="biru"
                          label="Sneakers(175)"
                          size="sm"
                        />
                      ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
          <Grid.Col xs={9}>
            <Divider color="gray.2" />
            <Group py="md" position="apart">
              <Group>
                <Text size="sm" color="dimmed">
                  Urutkan
                </Text>
                <Select
                  defaultValue="Best Seller"
                  data={["ukuran", "Best Seller", "warna"]}
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  styles={{
                    dropdown: {
                      borderRadius: theme.radius.lg,
                    },
                    item: {
                      borderRadius: 12,
                      paddingBlock: 4,
                      marginBlock: 2,
                    },
                  }}
                />
              </Group>
              <Group>
                <Text size="sm" weight={600}>
                  Lihat lebih banyak
                </Text>
              </Group>
            </Group>
            <Divider color="gray.2" />

            <SimpleGrid mt="lg" cols={4}>
              {Array(20)
                .fill("")
                .map((_, index) => (
                  <ProductCard
                    key={index}
                    image="https://i1.adis.ws/i/jpl/jd_ID1674_al?w=400&resmode=sharp&qlt=90&fmt=jpg"
                    title="Sneakers"
                    price="Rp 3.700.000"
                    url="/playground/jdclone/product/detail"
                  />
                ))}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
