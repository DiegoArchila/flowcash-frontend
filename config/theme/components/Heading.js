const Heading = {
  baseStyle: {
    color: "headings",
    lineHeight: "shorter",
    mb: 2,
  },
  sizes: {
    xl: {
      fontSize: ["5xl", null, "6xl"],
      fontWeight: "bold",
    },
    lg: {
      fontSize: ["4xl", null, "5xl"],
      fontWeight: "semibold",
    },
    md: {
      fontSize: ["3xl", null, "4xl"],
      fontWeight: "semibold",
    },
    sm: {
      fontSize: ["2xl", null, "3xl"],
      fontWeight: "medium",
    },
    xs: {
      fontSize: ["xl", null, "2xl"],
      fontWeight: "medium",
    },
  },
  defaultProps: {
    size: "md",
  },
};

export default Heading;
