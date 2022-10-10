/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Container,
  Image,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import CardWithButton from "./components/card-with-button";
import JdNavbar from "./components/jdnavbar";
import ProductCard from "./components/product-card";

type Props = {};

export default function JdClone({}: Props) {
  const theme = useMantineTheme();

  return (
    <Box>
      <JdNavbar />
      <Image src="https://sombrero.jdsports.id/pub/media/wysiwyg/HomeBanner/Footwear_Refresh_Homepage_V2_1920x840.jpg" />

      <Container py="lg" fluid={false} size="xl">
        <Image
          mt={30}
          src="https://sombrero.jdsports.id/pub/media/wysiwyg/RAFFLE/Yeezy_700_V3_Fade_Salt_1704x185.jpg"
        />
        <Title order={2} mt={30}>
          Shop by Category
        </Title>
        <SimpleGrid cols={3} mt="sm" spacing="xl">
          {[
            "https://sombrero.jdsports.id/pub/media/wysiwyg/ShopByCategory/shop_men_2_11zon_1.jpeg",
            "https://sombrero.jdsports.id/pub/media/wysiwyg/ShopByCategory/shop_women_3_11zon_1.jpeg",
            "https://sombrero.jdsports.id/pub/media/wysiwyg/ShopByCategory/shop_kids_1_11zon_1.jpeg",
          ].map((item, index) => (
            <CardWithButton image={item} key={index} />
          ))}
        </SimpleGrid>
        <Title order={2} mt={60}>
          Our top picks
        </Title>
        <SimpleGrid cols={4} mt="lg" spacing="xl">
          <ProductCard
            image="https://i1.adis.ws/i/jpl/jd_ID1674_al?w=400&resmode=sharp&qlt=90&fmt=jpg"
            title="Sneakers"
            price="Rp 3.700.000"
            url="/playground/jdclone/product/detail"
            withFavoiriteButton={false}
          />
          <ProductCard
            image="https://i1.adis.ws/i/jpl/jd_GZ9722_al?w=400&resmode=sharp&qlt=90&fmt=jpg"
            title="Sneakers"
            price="Rp 3.700.000"
            url="/playground/jdclone/product/detail"
            withFavoiriteButton={false}
          />
          <ProductCard
            image="https://i1.adis.ws/i/jpl/jd_DX1257-700_al?w=400&resmode=sharp&qlt=90&fmt=jpg"
            title="Sneakers"
            price="Rp 3.700.000"
            url="/playground/jdclone/product/detail"
            withFavoiriteButton={false}
          />
          <ProductCard
            image="https://i1.adis.ws/i/jpl/jd_GV9544_al?w=400&resmode=sharp&qlt=90&fmt=jpg"
            title="Sneakers"
            price="Rp 3.700.000"
            url="/playground/jdclone/product/detail"
            withFavoiriteButton={false}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
