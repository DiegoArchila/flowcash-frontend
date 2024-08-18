import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" h={"48px"}  mt={"auto"} bgColor={"#3a86ff"}
    boxShadow={"dark-lg"}>
        <Text color={"white"} textAlign={"center"} fontFamily={"Input-Medium"} fontSize={"1.2rem"}>Diego Archila</Text>
    </Box>
  )
}
