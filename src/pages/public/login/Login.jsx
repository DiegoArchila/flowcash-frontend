//React
import { useState, useEffect } from 'react';

//Redux
import { useSelector, useDispatch } from "react-redux";

//Redux Thunks
import { UserThunks } from "../../../store/slices/user/UserThunks.js"
import { errorsClear } from "../../../store/slices/user/User.js"

//Chakra UI
import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Spacer,
    HStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';

function Login() {

    const { isLoading, errors, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setlogin] = useState({
        email: "",
        password: ""
    })

    const HandleSudmit = (e) => {
        e.preventDefault();
        dispatch(UserThunks.loginUser(login));
    }

    const HandleChange = (e) => {
        const { name, value } = e.target;

        setlogin({
            ...login,
            [name]: value
        });

        if (errors !== null) {
            dispatch(errorsClear());
        }
    }

    const token = localStorage.getItem("MablaUser");

    console.log("EStes es el token en el login", token)

    return (
        <Container display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>


            <form onSubmit={HandleSudmit}>

                {/* Error Message */}
                <Alert status='error' mb={3} display={!(errors === null) ? "block" : "none"} borderRadius={5} padding={3} >
                    <HStack>
                        <AlertIcon />
                        <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                    </HStack>
                    <AlertDescription>{"Contraseña o usuario invalido."}</AlertDescription>
                </Alert>

                <Spacer height={10} />

                <FormControl isRequired>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <Input name='email' type="email" placeholder="Email" value={login.email} onChange={HandleChange} />
                </FormControl>

                <Spacer height={5} />

                <FormControl isRequired>
                    <FormLabel>
                        Contraseña
                    </FormLabel>
                    <Input name='password' type="password" placeholder="Password" value={login.password} onChange={HandleChange} />
                </FormControl>

                <Spacer height={5} />

                <Button type="submit" colorScheme={"blue"} width={"100%"} variant={"solid"} isLoading={isLoading} >
                    Iniciar sesión
                </Button>

            </form>

        </Container>
    )
}

export default Login;