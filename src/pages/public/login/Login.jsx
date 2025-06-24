// React & Redux
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserThunks } from '../../../store/slices/user/UserThunks';
import { errorsClear } from '../../../store/slices/user/User';

// Chakra UI
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Container,
    Center
} from '@chakra-ui/react';

// React Icons
import { FiMail, FiLock } from 'react-icons/fi';
import Alerts from '../../../components/Alerts/Alerts';

function Login() {
    const dispatch = useDispatch();
    const { isLoading, errors } = useSelector((state) => state.user);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        if (errors) dispatch(errorsClear());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UserThunks.loginUser(credentials));
    };

    return (
        <Box>
            <Container maxW="sm">
                <Box
                    bg="white"
                    boxShadow="xl"
                    rounded="lg"
                    p={8}
                    as="form"
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={6}>
                        <Center>
                            <Text fontSize="xl" fontWeight="bold" color="blue.600">
                                Iniciar sesión
                            </Text>
                        </Center>

                        {errors && (
                            <Alerts
                                status={'error'}
                                title='Error'
                                description={'Usuario o contraseña incorrectos.'}
                            />
                        )}

                        <FormControl isRequired>
                            <FormLabel color="text.paragraphs">Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FiMail color="gray" />
                                </InputLeftElement>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    color={"text.subheadings"}
                                    fontSize={'16px'}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="text.paragraphs">Contraseña</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <FiLock color="gray" />
                                </InputLeftElement>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </FormControl>

                        <Button
                            colorScheme="blue"
                            type="submit"
                            isLoading={isLoading}
                            width="full"
                        >
                            Iniciar sesión
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;