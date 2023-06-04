import React, { useState, useEffect } from "react";
import {
    VStack,
    StackDivider,
    Center,
    Text,
} from "@chakra-ui/react";
import { CartaPartida } from "./CartaPartida";

export function Historial() {
    const username = "adri";
    //
    const [partidasPrueba, setPartidasPrueba] = useState([]);
    const [partidas, setPartidas] = useState([
        {
            ganador: "adri",
            fecha: "13/05/2023",
            usuario1: "adri",
            usuario2: "pepe123",
            usuario3: "jose234",
            usuario4: "ana345",
        },
        {
            ganador: "luis234",
            fecha: "15/05/2023",
            usuario1: "adri",
            usuario2: "maria123",
            usuario3: "luis234",
            usuario4: "lucia345",
        },
        {
            ganador: "marta345",
            fecha: "16/05/2023",
            usuario1: "adri",
            usuario2: "julian123",
            usuario3: "rosa234",
            usuario4: "marta345",
        },
        {
            ganador: "mario123",
            fecha: "17/05/2023",
            usuario1: "adri",
            usuario2: "mario123",
            usuario3: "carlos234",
            usuario4: "roberto345",
        },
        {
            ganador: "adri",
            fecha: "18/05/2023",
            usuario1: "adri",
            usuario2: "diego123",
            usuario3: "sara234",
            usuario4: "patri345",
        },
    ]);

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
                setPartidasPrueba(result);
                console.log(result);
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
        <>
            <VStack>
                {partidasPrueba.partida.map((partida) => 
                    <Text>{JSON.stringify(partida)}</Text>)}
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
                >
                    {
                        /*
                    partidas.map((partida) => <CartaPartida ganador={partida.ganador} fecha={partida.fecha} usuario1={partida.usuario1} usuario2={partida.usuario2} usuario3={partida.usuario3} usuario4={partida.usuario4} />)
                    */
                    }
                    
                </VStack>
            </Center>
        </>
    );
}
