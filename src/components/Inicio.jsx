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
import { Box } from "@chakra-ui/react";
//import { useToast } from "@chakra-ui/react";

export function Inicio() {
    useEffect(() => {
        async function registrar (){
            var requestOptions = {
                method: "GET",
                redirect: "follow",
                credentials: "include",
            };

            fetch("http://localhost:8000/cuenta/quien-soy", requestOptions)
                .then(async response => response.json())
                .then(result => {
                    console.log(result.username);
                    return(result.username);
                })
                .then((nombre_usuario) => {
                    socket.connect();
                    socket.emit("registro", nombre_usuario);
                })
                .catch(error => console.log("error", error));
        }

        
        registrar();
        
        
    },[]);


    
    const [paginaActual, setPaginaActual] = useState("inicio");
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
