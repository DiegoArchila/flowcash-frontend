import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" h={"48px"}  mt={"auto"} bgColor={"gray.800"}
    boxShadow={"dark-lg"}>
        <Text color={"white"} textAlign={"center"} fontFamily={"Input-Medium"} fontSize={"1.2rem"}>Diego Archila</Text>
    </Box>
  )
}
