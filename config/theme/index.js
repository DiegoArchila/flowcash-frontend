import { extendTheme } from "@chakra-ui/react";
import colors from "./categories/colors";
import fonts from "./categories/fonts";
import breakpoints from "./categories/breakpoints";

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
      '*':{
        fontFamily: "paragraphs"
      },
      body: {
        bg: "gray.50",
        color: "gray.600",
      },
      "@font-face": [{
        fontFamily: "brand",
        src: "url('/src/assets/fonts/Anta/Anta-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Poppins",
        src: "url('/src/assets/fonts/Poppins/Poppins-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Poppins-SemiBold",
        src: "url('/src/assets/fonts/Poppins/Poppins-SemiBold.woff2') format('woff2')",
        fontWeight: "600",
        fontStyle: "normal",
      },
      {
        fontFamily: "Lato",
        src: "url('/src/assets/fonts/Lato/Lato-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Roboto",
        src: "url('/src/assets/fonts/Roboto/Roboto-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Inter",
        src: "url('/src/assets/fonts/Inter/Inter-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },

    ],

    },
  },
});

export default theme;