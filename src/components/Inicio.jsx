import React, { useEffect, useState } from "react";
import { useGlobalState } from "./GlobalState";
import { Barra } from "./Barra";
import Personalizar from "./Personalizar";
import { PersonalizarTablero } from "./PersonalizarTablero";
import { PersonalizarBaraja } from "./PersonalizarBaraja";
import { Amigos } from "./Amigos";
import { Perfil } from "./Perfil";
import { Historial } from "./Historial";
import { EmpezarPartida } from "./EmpezarPartida";
import { socket } from "../socket";

export function Inicio() {

    const [nombre_usuario, setNombreUsuario] = useState("");


    useEffect(() => {
        async function obtenerDatos (){
            var requestOptions = {
                method: "GET",
                redirect: "follow",
                credentials: "include",
            };

            fetch("http://localhost:8000/cuenta/quien-soy", requestOptions)
                .then(async response => 
                    response.json())
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
    const [globalState, setGlobalState] = useGlobalState();
    switch (paginaActual) {
    case "inicio":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <EmpezarPartida puntos={893} />
            </>
        );
    case "personalizar":
        return (
            <div>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Personalizar setterPaginaActual={setPaginaActual} />
            </div>
        );
    case "personalizarTablero":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <PersonalizarTablero />
            </>
        );
    case "personalizarBaraja":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <PersonalizarBaraja estilo="Baraja minimalista"/>
            </>
        );
    case "amigos":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Amigos />
            </>
        );
    case "perfil":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Perfil nombre_usuario="pepe" />
            </>
        );
    case "historial":
        return (
            <>
                <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
                <Historial />
            </>
        );

    default:
        break;
    }
}