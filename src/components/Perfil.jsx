import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Text,
    VStack,
    Modal,
    ModalFooter,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import { ViewOffIcon } from "@chakra-ui/icons";
import { useGlobalState } from "./GlobalState";
import Login from "./Login";

export function Perfil() {
    const [,setGlobalState] = useGlobalState();
    const [nombre_usuario, setNombreUsuario] = useState("Nuevo nombre usuario");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmacion, setpasswordConfirmacion] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const obtenerDatosPerfil = async () => {

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        };

        fetch("http://localhost:8000/cuenta/quien-soy", requestOptions)
            .then(async response => 
                response.json())
            .then(result => {
                console.log(result);
                setNombreUsuario(result.username);
                setEmail(result.correo);
                console.log(nombre_usuario);
            })
            .catch(error => console.log("error", error));
    };

    const handleGuardarCambios = () => {
        console.log(email);
        console.log(password);
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        if(password.length>0){
            urlencoded.append("cambioPassword", true);
        }
        else{
            urlencoded.append("cambioPassword", false);
        }

        var requestOptions = {
            method: "POST",
            credentials: "include",
            body: urlencoded,
            redirect: "follow"
        };

        fetch("http://localhost:8000/cuenta/cambiar-email-password", requestOptions)
            .then(response => {
                if (response.status === 200){
                    setPassword("");
                }
                return response.text();})
            .then(result => {
                console.log(result);
            })
            .catch(error => console.log("error", error));
    };

    const handleBorrarCuenta = (e) => {
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("password", passwordConfirmacion);

        var requestOptions = {
            method: "POST",
            body: urlencoded,
            credentials: "include",
            redirect: "follow"
        };

        fetch("http://localhost:8000/cuenta/eliminar", requestOptions)
            .then(response => response.text())
            .then(result => {
                setGlobalState(<Login/>);
                console.log(result);
            })
            .catch(error => console.log("error", error));
    };

    useEffect(()=>{
        obtenerDatosPerfil();
    }, []);

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleBorrarCuenta}>
                        <ModalHeader>Confirma la eliminación de la cuenta</ModalHeader>
                        <ModalBody pb={6}>
                        
                            <FormControl id="password" isRequired>
                                <FormLabel>Introduce la contraseña</FormLabel>
                                <InputGroup>
                                    <Input
                                        value={passwordConfirmacion}
                                        ref={initialRef} 
                                        placeholder='Contraseña'
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        onChange={(e)=>setpasswordConfirmacion(e.target.value)}
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
                        
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" loadingText="Submitting" colorScheme='red' mr={3}>
                            Eliminar
                            </Button>
                            <Button onClick={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
                
            </Modal>
            <VStack>
                <Text pt="1em" fontSize="4xl">Perfil</Text>
                <Text pt="1em" fontSize="xl">Aquí podrás configurar tu correo electrónico y contraseña</Text>
            </VStack>
            <Flex
                minH="100%"
                align="center"
                justify="center"
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack
                    spacing={4}
                    w="full"
                    maxW="md"
                    bg={useColorModeValue("white", "gray.700")}
                    rounded="xl"
                    boxShadow="lg"
                    p={6}
                    my={12}
                >
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                        Configuración de perfil
                    </Heading>
                    <FormControl id="userName" />
                    <FormControl id="userName">
                        <FormLabel>Nombre de usuario</FormLabel>
                        <Input
                            disabled="true"
                            placeholder={nombre_usuario}
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Correo electrónico</FormLabel>
                        <Input
                            value={email}
                            placeholder="Nuevo correo electronico"
                            _placeholder={{ color: "gray.500" }}
                            type="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            value={password}
                            placeholder="Nueva contraseña"
                            _placeholder={{ color: "gray.500" }}
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        bg="blackAlpha.800"
                        color="white"
                        onClick={onOpen}>
                        Eliminar cuenta
                    </Button>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            bg="red.400"
                            color="white"
                            w="full"
                            _hover={{
                                bg: "red.500",
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            bg="blue.400"
                            color="white"
                            w="full"
                            _hover={{
                                bg: "blue.500",
                            }}
                            onClick={handleGuardarCambios}
                        >
                            Guardar cambios
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
}
