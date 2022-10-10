/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import {
  BackgroundImage,
  Box,
  Center,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";

type Props = {
  image?: string;
};

export default function CardWithButton({ image }: Props) {
  const theme = useMantineTheme();

  return (
    <BackgroundImage sx={{ maxWidth: 500 }} src={image || ""}>
      <Box pt={500} pb="xl" px="md">
        <Center>
          <Text weight={900} sx={{ fontSize: 40, color: theme.white }}>
            SHOP MEN'S
          </Text>
        </Center>
        <Stack>
          {["Men's Footware", "Men's Clothing", "Men's Accesories"].map(
            (item, index) => (
              <UnstyledButton
                key={index}
                py="md"
                sx={{
                  fontSize: 24,
                  backgroundColor: theme.white,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item}
              </UnstyledButton>
            )
          )}
        </Stack>
      </Box>
    </BackgroundImage>
  );
}
