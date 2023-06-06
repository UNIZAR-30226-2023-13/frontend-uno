import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Wrap,
    WrapItem,
    useToast,
    FormErrorMessage,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import imagen_inicio from "../images/uno_inicio.jpeg";
import { useGlobalState } from "./GlobalState";
import { Registro } from "./Registro";
import { Inicio } from "./Inicio";

export default function Login() {

    const [, setGlobalState] = useGlobalState();
    const [usuarioContrasenaIncorrecto, setUsuarioContrasenaIncorrecto] = useState(false);
    const toast = useToast();

    //SE PRODUCE ERROR AL PONER CONTRASEÑA EQUIVOCADA Y CORREGIRLA DESPUES
    const intentarLogear = async () => {
        var requestOptions = {
            method: "POST",
            credentials: "include",
            redirect: "follow"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/login", requestOptions)
            .then(response => {
                if (response.status === 200){
                    setGlobalState(<Inicio/>);
                }
            })
            .catch(error => console.log("error", error));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const username = e.target.username.value;
        const password = e.target.password.value;
        fetch(process.env.REACT_APP_BACKEND_HOST + "/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: new URLSearchParams({
                username,
                password,
            }),
        }).then(res => {
            if (res.status === 200){
                setGlobalState(<Inicio/>);
            }
            else if (res.status === 401){
                setUsuarioContrasenaIncorrecto(true);
            }
        })
        // TODO: esto quiza seria buena idea poner como catch de todos los fetch 
            .catch(() => {
                toast({
                    title: "Ha sucedido un error",
                    description: "Contacte con un administrador",
                    status: "error",
                    position: "top",
                });
            });
        
    

    };

    useEffect(()=>{
        intentarLogear();
    });

    return (
        <>
            <Wrap>
                <WrapItem>
                </WrapItem>
            </Wrap>
            <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
                <Flex p={8} flex={1} align="center" justify="center">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4} w="full" maxW="md">
                            <Heading fontSize="4xl">Inicio de sesión</Heading>
                        
                            <FormControl id="username" isRequired isInvalid={usuarioContrasenaIncorrecto}>
                                <FormLabel requiredIndicator={false} fontSize="xl">Usuario</FormLabel>
                                <Input fontSize="xl" type="user" />
                            </FormControl>
                            <FormControl id="password" isRequired isInvalid={usuarioContrasenaIncorrecto}>
                                <FormLabel requiredIndicator={false} fontSize="xl">Contraseña</FormLabel>
                                <Input fontSize="xl" type="password" />
                                {!usuarioContrasenaIncorrecto ? (
                                    <></>
                                ) : (
                                    <FormErrorMessage>
                                        Usuario y contraseña incorrectos
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <Stack spacing={6}>
                                <Button py="1.3em" fontSize="xl" type="submit" colorScheme="blue" variant="solid">
                                    Iniciar sesión
                                </Button>
                                <Button py="1.3em" onClick={() => setGlobalState(<Registro />)} fontSize="xl" type="submit" colorScheme="green" variant="solid">
                                    ¿No tienes cuenta?
                                </Button>
                            </Stack>
                        
                        </Stack>
                    </form>
                </Flex>
                <Flex flex={1}>
                    <Image
                        maxHeight="100vh"
                        width="100%"
                        objectFit="cover"
                        alt="Login Image"
                        src={imagen_inicio}
                    />
                </Flex>
            </Stack>
        </>
    );
}
