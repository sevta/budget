import { MantineProviderProps } from "@mantine/core";

export const themeConfig: MantineProviderProps["theme"] = {
  loader: "dots",

  components: {
    Container: {
      defaultProps: {
        fluid: true,
      },
    },

    Select: {
      styles(theme) {
        return {
          dropdown: {
            borderRadius: theme.radius.lg,
          },
          item: {
            borderRadius: 9,
            paddingBlock: 4,
            marginBlock: 2,
          },
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },
      defaultProps: {
        radius: "md",
        transition: "pop-top-left",
        transitionDuration: 80,
        transitionTimingFunction: "ease",
      },
    },

    NumberInput: {
      styles(theme) {
        return {
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },
      defaultProps: {
        radius: "md",
      },
    },
    Textarea: {
      styles(theme) {
        return {
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },
      defaultProps: {
        radius: "md",
      },
    },
    DatePicker: {
      styles(theme) {
        return {
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },

      defaultProps: {
        radius: "md",
      },
    },
    DateRangePicker: {
      styles(theme) {
        return {
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },

      defaultProps: {
        radius: "md",
      },
    },
    PasswordInput: {
      styles(theme) {
        return {
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },
      defaultProps: {
        radius: "md",
      },
    },
    TextInput: {
      styles(theme) {
        return {
          input: {
            // backgroundColor:
            //   theme.colorScheme === "light"
            //     ? theme.colors.gray[0]
            //     : theme.fn.darken(theme.colors.dark[6], 0.1),
            // borderWidth: 0,
            // borderBottomWidth: 2,
            // borderColor: theme.fn.primaryColor(),
          },
        };
      },
      defaultProps: {
        radius: "md",
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
      },
    },
    Button: {
      styles: {
        root: {
          fontWeight: 500,
        },
      },
      defaultProps: {
        radius: "md",
      },
    },
    Paper: {
      defaultProps: {
        // withBorder: true,
        radius: "lg",
        // shadow: "xs",
        // shadow: "xs",
        // withBorder: true,
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "xs",
      },
      // styles(theme, params) {
      //   return {
      //     backgroundColor:
      //       theme.colorScheme === "light"
      //         ? theme.white
      //         : theme.colors.dark[9],
      //   };
      // },
    },
  },
};
