import React, { useState, useEffect } from "react";
import {
    VStack,
    StackDivider,
    Center,
    Text,
    Box,
} from "@chakra-ui/react";
import { CartaPartida } from "./CartaPartida";

export function Historial() {
    const [partidasPrueba, setPartidasPrueba] = useState([]);
    

    const obtenerPartidas = async () => {

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        };

        fetch("http://localhost:8000/partidas", requestOptions)
            .then(async response => 
                response.json())
            .then(result => {
                setPartidasPrueba(result.partidas);
                console.log("partidas: ");
                console.log(result.partidas);
            })
            .catch(error => console.log("error", error));
    };

    const [nombre_usuario, setNombreUsuario] = useState("");

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
                console.log(result.username);
            })
            .catch(error => console.log("error", error));
    };

    useEffect(()=>{
        obtenerDatosPerfil();
        obtenerPartidas();
    }, []);

    return (
        <Box>
            <VStack>
                <Text pt="1em" fontSize="4xl">Historial</Text>
                <Text pt="1em" fontSize="xl">Aquí podrás ver tus anteriores partidas jugadas</Text>
            </VStack>
            <Center
                paddingY="20px"
                paddingX="10%"
            >
                <VStack
                    py={5}

                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="center"
                    borderRadius="10px"
                    border="1px"
                    borderColor="gray.300"
                    width={680}
                    boxShadow="0 0 2rem gray"
                    bg={"white"}
                >
                    {
                        partidasPrueba.map((partida, key) => <CartaPartida key={"jugador"+key} 
                            fecha={partida.fecha}
                            usuarioPropio={(partida.jugadores.filter((j) => j.nombre === nombre_usuario))[0]}
                            otrosUsuarios={partida.jugadores.filter((j) => j.nombre !== nombre_usuario)} />)
                    }
                    {partidasPrueba.length===0 ? 
                        <Text py={10} fontSize={"2xl"}>Aún no tienes partidas</Text>
                        : ""}
                </VStack>
            </Center>
        </Box>
    );
}
