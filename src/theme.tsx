import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "gray.700",
      },
    }),
  },
  components: {
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === "dark" ? "gray.800" : "white",
          borderColor: props.colorMode === "dark" ? "gray.700" : "gray.200",
          borderWidth: "1px",
          shadow: props.colorMode === "dark" ? "lg" : "sm",
        },
      }),
    },
    Button: {
      variants: {
        solid: (props: any) => {
          if (props.colorScheme === "gray") {
            return {
              bg: props.colorMode === "dark" ? "gray.700" : "gray.100",
              color: props.colorMode === "dark" ? "gray.100" : "gray.700",
              _hover: {
                bg: props.colorMode === "dark" ? "gray.600" : "gray.200",
              },
            };
          }
        },
      },
    },
  },
});

export default theme;
