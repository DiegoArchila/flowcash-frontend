import { Box, Center, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Center as="footer" h={"48px"}  mt={"auto"} bgColor={"#100C08"}
      boxShadow={"dark-lg"}>
        <Box>
          <Text display={"inline-block"} color={"white"} textAlign={"center"} fontFamily={"Input-Medium"} fontSize={"1.2rem"}>2024</Text>
          <Text display={"inline-block"} color={"white"}>, Diego Archila</Text>
        </Box>
    </Center>
  )
}
