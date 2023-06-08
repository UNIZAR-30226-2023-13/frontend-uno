import React, { useEffect, useState } from "react";
import { Barra } from "./Barra";
import Personalizar from "./Personalizar";
import { PersonalizarTablero } from "./PersonalizarTablero";
import { PersonalizarBaraja } from "./PersonalizarBaraja";
import { Amigos } from "./Amigos";
import { Perfil } from "./Perfil";
import { Historial } from "./Historial";
import { EmpezarPartida } from "./EmpezarPartida";
import { socket } from "../socket";
import { Box, useToast } from "@chakra-ui/react";
import { useGlobalState } from "./GlobalState";
import Login from "./Login";

export function Inicio() {
    useEffect(() => {
        async function registrar (){
            var requestOptions = {
                method: "GET",
                redirect: "follow",
                credentials: "include",
                mode: "cors",
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
                    console.log(result.username);
                    return(result.username);
                })
                .then((nombre_usuario) => {
                    socket.connect();
                    socket.emit("registro", nombre_usuario);
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
        }

        
        registrar();
        
        
    },[]);


    
    const [paginaActual, setPaginaActual] = useState("inicio");
    const [, setGlobalState] = useGlobalState();
    const toast = useToast();

    switch (paginaActual) {
    case "inicio":
        return (
            <Box minH={"100vh"}>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <EmpezarPartida/>
            </Box>
        );
    case "personalizar":
        return (
            <Box minH={"100vh"}>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Personalizar setterPaginaActual={setPaginaActual}/>
            </Box>
        );
    case "personalizarTablero":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <PersonalizarTablero/>
            </>
        );
    case "personalizarBaraja":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <PersonalizarBaraja/>
            </>
        );
    case "amigos":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Amigos/>
            </>
        );
    case "perfil":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Perfil/>
            </>
        );
    case "historial":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Historial/>
            </>
        );

    default:
        break;
    }
}
