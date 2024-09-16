import { Box, Center, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Center as="footer" h="48px" bgColor="#100C08" boxShadow="dark-lg">
      <Box textAlign="center">
        <Text as="span" color="white" fontFamily="Input-Medium" fontSize="lg">
          2024
        </Text>
        <Text as="span" color="white">
          , Diego Archila
        </Text>
      </Box>
    </Center>
  )
}
