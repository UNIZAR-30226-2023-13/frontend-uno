import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    FormErrorMessage,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    Wrap,
    WrapItem,
    useToast,
    Divider
} from "@chakra-ui/react";

import { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useGlobalState } from "./GlobalState";
import Login from "./Login";

export function Registro() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [, setGlobalState] = useGlobalState();
    const [contrasenasDistintas, setContrasenasDistintas] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = e.target.user.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        // Si los datos son coherentes
        if (password === confirmPassword) {
            setContrasenasDistintas(false);
            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                body: new URLSearchParams({
                    username: nombre,
                    email: email,
                    password: password,
                }),
            });

            console.log(res);

            if (res.status === 401) {
                toast({
                    title: "Ha sucedido un error",
                    status: "error",
                    position: "top",
                });
            } 
            else if (res.status === 403) {
                toast({
                    title: "Ya existe un usuario con ese nombre",
                    status: "warning",
                    position: "top",
                });
            }
            else if(res.status === 200){
                onOpen(true);    
            }
        }
        // Si los datos no son coherentes
        else {
            setContrasenasDistintas(true);
        }
    };

    return (
        <>
            <Wrap>
                <WrapItem>
                </WrapItem>
            </Wrap>
            <AlertDialog
                isCentered
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Cuenta creada correctamente
                        </AlertDialogHeader>
                        <Divider></Divider>
                        <AlertDialogBody>
                            Ya puedes empezar a jugar al UNO
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Flex align="center">
                                <Button
                                    align="center"
                                    colorScheme="blue"
                                    onClick={() => {
                                        onClose();
                                        setGlobalState(<Login />);
                                    }}
                                    ml={3}
                                >
                                    OK
                                </Button>
                            </Flex>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Flex
                minH="100vh"
                align="center"
                justify="center"
                backgroundColor="#ccebff"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2387c5ff' fill-opacity='0.14'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
                bgSize="10%"
            >
                <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                    <Stack align="center">
                        <Heading fontSize="4xl" textAlign="center">
                            Crear cuenta
                        </Heading>
                        <Text fontSize="lg" color="gray.600" fontWeight="bold">
                            ¡Empieza a disfrutar del juego de cartas más
                            popular!
                        </Text>
                    </Stack>
                    <Box
                        rounded="lg"
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow="lg"
                        p={8}
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <Box>
                                    <FormControl id="user" isRequired >
                                        <FormLabel requiredIndicator={false}>Nombre de usuario</FormLabel>
                                        <Input type="text" />
                                    </FormControl>
                                </Box>
                                <FormControl id="email" isRequired>
                                    <FormLabel requiredIndicator={false}>Correo electrónico</FormLabel>
                                    <Input type="email" />
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel requiredIndicator={false}>Contraseña</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />
                                        <InputRightElement h="full">
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (showPassword) =>
                                                            !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl
                                    id="confirmPassword"
                                    isRequired
                                    isInvalid={contrasenasDistintas}
                                >
                                    <FormLabel requiredIndicator={false}>Confirmar contraseña</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />
                                        <InputRightElement h="full">
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (showConfirmPassword) =>
                                                            !showConfirmPassword
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {!contrasenasDistintas ? (
                                        <></>
                                    ) : (
                                        <FormErrorMessage>
                                            Las contraseñas no coinciden.
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        type="submit"
                                        loadingText="Submitting"
                                        size="lg"
                                        bg="blue.400"
                                        color="white"
                                        _hover={{
                                            bg: "blue.500",
                                        }}
                                    >
                                        Crear cuenta
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align="center">
                                        ¿Ya tienes una cuenta?{" "}
                                        <Link
                                            onClick={() =>
                                                setGlobalState(<Login />)
                                            }
                                            color="blue.400"
                                        >
                                            Inicia sesión
                                        </Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}
