import React, { useState, useEffect } from "react";
import {
    VStack,
    StackDivider,
    Center,
    Text,
    Box,
    useToast,
    CircularProgress,
} from "@chakra-ui/react";
import { CartaPartida } from "./CartaPartida";
import { useGlobalState } from "./GlobalState";
import Login from "./Login";

export function Historial() {
    const [partidasPrueba, setPartidasPrueba] = useState([]);
    const [loaded, setLoaded] = useState(false);
    

    const obtenerPartidas = async () => {

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/partidas", requestOptions)
            .then(async response => 
                response.json())
            .then(result => {
                setLoaded(true);
                setPartidasPrueba(result.partidas);
                console.log("partidas: ");
                console.log(result.partidas);
            })
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    const [nombre_usuario, setNombreUsuario] = useState("");
    const [, setGlobalState] = useGlobalState();
    const toast = useToast();

    const obtenerDatosPerfil = async () => {

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include",
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/cuenta/quien-soy", requestOptions)
            .then(response => {
                if (response.status === 200){   
                    return response.json();
                }
                else if(response.status === 500){
                    toast({
                        title: "Ha sucedido un error",
                        status: "error",
                        position: "top",
                    });
                }
            })
            .then(result => {
                console.log(result);
                setNombreUsuario(result.username);
                console.log(result.username);
            })
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    useEffect(()=>{
        obtenerDatosPerfil();
        obtenerPartidas();
    }, []);

    return (
        <Box>
            <VStack paddingX="10%">
                <Text pt="1em" fontSize="4xl">Historial</Text>
                <Text align="center" pt="1em" fontSize="xl">Aquí podrás ver tus anteriores partidas jugadas</Text>
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
                    {!loaded ? <CircularProgress isIndeterminate color='green.300' /> : ""}
                    {
                        partidasPrueba.map((partida, key) => <CartaPartida key={"jugador"+key} 
                            fecha={partida.fecha}
                            usuarioPropio={(partida.jugadores.filter((j) => j.nombre === nombre_usuario))[0]}
                            otrosUsuarios={partida.jugadores.filter((j) => j.nombre !== nombre_usuario)} />)
                    }
                    {partidasPrueba.length===0 && loaded ? 
                        <Text py={10} fontSize={"2xl"}>Aún no tienes partidas</Text>
                        : ""}
                </VStack>
            </Center>
        </Box>
    );
}
