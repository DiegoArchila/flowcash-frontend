import { Button, Container, FormControl, FormLabel, Input, Spacer } from "@chakra-ui/react";

function Login() {

    const HandleSudmit = (e) => {
        e.preventDefault();
    }

  return (
    <Container display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>

        <form onSubmit={HandleSudmit}>
            <FormControl isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input type="email" placeholder="Email" />
            </FormControl>

            <Spacer height={5} />
            
            <FormControl isRequired>
                <FormLabel>
                    Contraseña
                </FormLabel>
                <Input type="password" placeholder="Password" />
            </FormControl>

            <Spacer height={5} />

            <Button type="submit" colorScheme={"blue"} width={"100%"} variant={"solid"}>
                Iniciar sesión
            </Button>

        </form>

    </Container>
  )
}

export default Login;