import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import imagen_inicio from "../images/uno_inicio.jpeg";
import { useGlobalState } from "./GlobalState";
import { Registro } from "./Registro";
// import { Registro } from './Registro';
import { Inicio } from "./Inicio";

export default function Login() {
    const [globalState, setGlobalState] = useGlobalState();
    const [noTienesCuentaPulsado, setNoTienesCuentaPulsado] = useState(false);
    const [sesionIniciada, setSesionIniciada] = useState(false);

    const intentarLogear = async () => {
        var requestOptions = {
            method: "POST",
            credentials: "include",
            redirect: "follow"
        };

        fetch("http://localhost:8000/login", requestOptions)
            .then(response => {
                if (response.status === 200){
                    setGlobalState(<Inicio/>);
                }
            })
            .catch(error => console.log("error", error));
    };

    useEffect(()=>{
        intentarLogear();
    });

    const [error, setError] = useState({
        existe: false,
        mensaje: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: new URLSearchParams({
                username,
                password,
            }),
        });
        console.log(res);
        if (res.status === 401) {
            setError({
                existe: true,
                mensaje: "Usuario y contraseña incorrecta",
            });
        } else if (res.status === 200) {
            // No se, redirect a la pagina principal
            setError({
                existe: false,
                mensaje: "",
            });
        }
    };
    if (!noTienesCuentaPulsado) {
        return (
            <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
                <Flex p={8} flex={1} align="center" justify="center">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4} w="full" maxW="md">
                            <Heading fontSize="4xl">Inicio de sesión</Heading>
                        
                            <FormControl id="username" isRequired>
                                <FormLabel fontSize="xl">Usuario</FormLabel>
                                <Input fontSize="xl" type="user" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel fontSize="xl">Contraseña</FormLabel>
                                <Input fontSize="xl" type="password" />
                            </FormControl>
                            <Stack spacing={6}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align="start"
                                    justify="space-between"
                                >
                                    <Checkbox size="lg">Recordarme</Checkbox>
                                    <Link fontSize="xl" onClick={() => setGlobalState(<Registro />)} color="blue.500">¿No tienes cuenta?</Link>
                                </Stack>
                                <Button py="1.3em" fontSize="xl" type="submit" colorScheme="blue" variant="solid">
                                Iniciar sesión
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
        );
    }
}
