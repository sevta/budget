/* eslint-disable jsx-a11y/alt-text */
import {
  ActionIcon,
  Box,
  BoxProps,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons";
import { useRouter } from "next/router";

type Props = {
  image?: string;
  url?: string;
  title?: string;
  price?: string;
  withFavoiriteButton?: boolean;
} & BoxProps;

export default function ProductCard({
  image,
  url,
  title,
  price,
  withFavoiriteButton = true,
  ...props
}: Props) {
  const router = useRouter();

  return (
    <Box
      sx={{ cursor: "pointer" }}
      onClick={() => router.push(url || "/")}
      {...props}
    >
      <Image src={image || ""} />
      <Group position="apart" mt="sm">
        <Text color="dimmed" weight={400}>
          {title}
        </Text>
        {withFavoiriteButton && (
          <ActionIcon radius="xl">
            <IconHeart />
          </ActionIcon>
        )}
      </Group>
      <Title weight={600} order={4}>
        {price}
      </Title>
    </Box>
  );
}
