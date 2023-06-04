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
//import { useToast } from "@chakra-ui/react";

export function Inicio() {

    const [nombre_usuario, setNombreUsuario] = useState("");
    //const toast = useToast();

    useEffect(() => {
        async function obtenerDatos(){
            //NO ME DEJA GESTIONAR EL ERROR
            var requestOptions = {
                method: "GET",
                redirect: "follow",
                credentials: "include",
            };

            fetch("http://localhost:8000/cuenta/quien-soy", requestOptions)
                .then(async response => response.json())
                .then(result => {
                    console.log(result.username);
                    setNombreUsuario(result.username);
                })
                .catch(error => console.log("error", error));
        }

        //socket.connect();
        
        obtenerDatos().then(()=>{
            console.log(nombre_usuario);
            socket.emit("registro", nombre_usuario);
        });
        
        
    },[]);


    
    const [paginaActual, setPaginaActual] = useState("inicio");
    switch (paginaActual) {
    case "inicio":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <EmpezarPartida/>
            </>
        );
    case "personalizar":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Personalizar setterPaginaActual={setPaginaActual}/>
            </>
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
