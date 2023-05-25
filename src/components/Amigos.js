import { Button, LongButton } from "./Button";
import { AmigoConectado } from "./AmigoConectado"
import { AmigoDesconectado } from "./AmigoDesconectado"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {React, useEffect, useState } from "react";
import { Invitacion } from "./Invitacion";
import { TextField } from "@mui/material";
import { StyledTextField } from "./StyledTextField";
import { StyledTextField2 } from "./StyledTextField2";
import { Inicio } from "./Inicio";
import { useGlobalState } from "./GlobalState";

export const Amigos = () => {
    
    const [globalState, setGlobalState] = useGlobalState();
    const [listaAmigos,setListaAmigos] = useState([]);
    const [amigosPulsado, setAmigosPulsado] = useState(true);
    const [invitacionesPulsado, setInvitacionesPulsado] = useState(false);
    const [anadirAmigoPulsado, setAnadirAmigoPulsado] = useState(false);

    const abrirAmigos = () => {
        setInvitacionesPulsado(false);
        setAmigosPulsado(true);
        setAnadirAmigoPulsado(false);
    }
    const abrirInvitaciones = () => {
        setAmigosPulsado(false)
        setInvitacionesPulsado(true);
        setAnadirAmigoPulsado(false);
    }
    const abrirAnadirAmigo = () => {
        setAmigosPulsado(false);
        setInvitacionesPulsado(false);
        setAnadirAmigoPulsado(true);
    }

    useEffect(() => {
        // Descubrir quien soy
        
        fetch("http://localhost:8000/login/quien-soy",{
            method:'GET',
            mode:'cors',
            credentials: "include",
        }).then(response => response.json())
        .then(data => console.log(data));
        


        
        fetch("http://localhost:8000/amigos",{
            method:'GET',
            mode:'cors',
            credentials: "include",
        })
        .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data => {
            setListaAmigos(data)
            console.log(data)
        })
        
    },[])


    if(amigosPulsado) {
        return (
            <div className="amigos">
                <div className="fila1">
                    <div className="leftButton">
                        <Button onClick={()=> setGlobalState(<Inicio></Inicio>)}>
                            <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                        </Button>
                    </div>
                    <div className="buttonAmigos">
                        <LongButton>Amigos</LongButton>
                    </div>
                    <div className="buttonInvitaciones">
                        <LongButton onClick={abrirInvitaciones}>Invitaciones</LongButton>
                    </div>
                    <div className="rightButton">
                        <Button onClick={abrirAnadirAmigo}>
                            <PersonAddAltIcon sx={{ fontSize:50 }}></PersonAddAltIcon>
                        </Button>
                    </div>
                </div>
                <div className="fila2">
                    {listaAmigos.map(a => {
                        return (
                            <AmigoConectado username={a.username} estado="Conectado"></AmigoConectado>
                            )
                    })}
                    {/*
                        <AmigoConectado username="paco" estado="Conectado"></AmigoConectado>
                        <AmigoConectado username="pepe" estado="Conectado"></AmigoConectado>
                        <AmigoDesconectado></AmigoDesconectado>
                    */}
                    
                </div>
            </div>
        )
    }
    else if(invitacionesPulsado){
        return (
            <div className="amigos">
                <div className="fila1">
                    <div className="leftButton">
                        <Button onClick={()=> setGlobalState(<Inicio></Inicio>)}>
                            <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                        </Button>
                    </div>
                    <div className="buttonAmigos">
                        <LongButton onClick={abrirAmigos}>Amigos</LongButton>
                    </div>
                    <div className="buttonInvitaciones">
                        <LongButton onClick={abrirInvitaciones}>Invitaciones</LongButton>
                    </div>
                    <div className="rightButton">
                        <Button onClick={abrirAnadirAmigo}>
                            <PersonAddAltIcon sx={{ fontSize:50 }}></PersonAddAltIcon>
                        </Button>
                    </div>
                </div>
                <div className="fila2">
                    <Invitacion username="jose24"></Invitacion>
                </div>
            </div>
        )
    }
    else if(anadirAmigoPulsado){
        return (
            <div className="amigos">
                <div className="fila1">
                    <div className="leftButton">
                        <Button onClick={()=> setGlobalState(<Inicio></Inicio>)}>
                            <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                        </Button>
                    </div>
                    <div className="buttonAmigos">
                        <LongButton onClick={abrirAmigos}>Amigos</LongButton>
                    </div>
                    <div className="buttonInvitaciones">
                        <LongButton onClick={abrirInvitaciones}>Invitaciones</LongButton>
                    </div>
                    <div className="rightButton">
                        <Button>
                            <PersonAddAltIcon sx={{ fontSize:50 }}></PersonAddAltIcon>
                        </Button>
                    </div>
                </div>
                <div className="fila2AnadirAmigo">
                    <StyledTextField2 placeholder="Buscar"></StyledTextField2>
                </div>
            </div>
        )
    }
}