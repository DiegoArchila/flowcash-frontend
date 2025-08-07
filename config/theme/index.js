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
      a: {
        color: "brand.500",
        _hover: {
          textDecoration: "underline",
        },
      },
      "h1, h2, h3, h4, h5, h6": {
        fontFamily: "heading",
        color: "text.headings",
      },
      "p": {
        fontFamily: "paragraphs",
        color: "text.paragraphs",
      },
      "button": {
        fontFamily: "button",
        color: "text.buttons",
      },
      "input, textarea": {
        fontFamily: "input",
        color: "text.inputs",
      },
      "label": {
        fontFamily: "label",
        color: "text.labels",
      },
      "@font-face": [{
        fontFamily: "brand",
        src: "url('/fonts/Anta/Anta-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Poppins",
        src: "url('/fonts/Poppins/Poppins-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Poppins-SemiBold",
        src: "url('/fonts/Poppins/Poppins-SemiBold.woff2') format('woff2')",
        fontWeight: "600",
        fontStyle: "normal",
      },
      {
        fontFamily: "Lato",
        src: "url('/fonts/Lato/Lato-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Roboto",
        src: "url('/fonts/Roboto/Roboto-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        fontFamily: "Inter",
        src: "url('/fonts/Inter/Inter-Regular.woff2') format('woff2')",
        fontWeight: "normal",
        fontStyle: "normal",
      },

    ],

    },
  },
});

export default theme;