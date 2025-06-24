import { extendTheme } from "@chakra-ui/react";
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import breakpoints from "./foundations/breakpoints";

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

export default theme;