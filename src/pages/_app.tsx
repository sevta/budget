import { ColorScheme, MantineColor, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { trpc } from "src/common/utils/trpc";

import "@fontsource/josefin-sans/100.css";
import "@fontsource/josefin-sans/200.css";
import "@fontsource/josefin-sans/300.css";
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/500.css";
import "@fontsource/josefin-sans/600.css";
import "@fontsource/josefin-sans/700.css";

import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

import "@fontsource/public-sans/100.css";
import "@fontsource/public-sans/200.css";
import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/public-sans/800.css";
import "@fontsource/public-sans/900.css";
import { themeConfig } from "src/common/config";

function App(props: any) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const [value] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const [colorScheme] = useLocalStorage<MantineColor>({
    key: "color-theme",
    defaultValue: "primary",
  });

  const [fontFamily] = useLocalStorage({
    key: "font-theme",
    defaultValue: "Source Sans Pro",
  });

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: value,
          primaryColor: colorScheme,
          fontFamily,
          headings: {
            fontFamily,
          },
          globalStyles(theme) {
            return {
              html: {
                "-webkit-font-smoothing": "antialiased",
                textSizeAdjust: "100%",
              },
            };
          },

          primaryShade: 5,
          colors: {
            secondary: [
              "#C8E9E8",
              "#9BD7D6",
              "#75C7C6",
              "#54BAB9",
              "#40A09F",
              "#358584",
              "#2C6E6D",
              "#255B5B",
              "#1F4C4B",
              "#193F3F",
            ],
            primary: [
              "#FAFAFC",
              "#DCD5EB",
              "#C1B4DC",
              "#A997CE",
              "#937DC2",
              "#7D63B6",
              "#6B4FA8",
              "#5E4594",
              "#533D82",
            ],
          },
          ...themeConfig,
        }}
      >
        <SessionProvider session={session}>
          <ModalsProvider>
            <NotificationsProvider>
              <NextNProgress />
              <Component {...pageProps} />
            </NotificationsProvider>
          </ModalsProvider>
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

export default trpc.withTRPC(App);
