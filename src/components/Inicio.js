import React, { useState } from "react";
import { LongButton } from "./Button";
import { StyledTextField } from "./StyledTextField";
import { Registro } from "./Registro";
import { useGlobalState } from "./GlobalState";
import { Login } from "./Login";
import { Personalizar } from "./Personalizar";
import { Amigos } from "./Amigos";
import { Formato } from "./Formato";

export const Inicio = () => {
    const [globalState, setGlobalState] = useGlobalState();

    const [noTienesCuentaPulsado, setNoTienesCuentaPulsado] = useState(false);

    const [error,setError] = useState({
        existe: false,
        mensaje: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const res = await fetch('http://localhost:8000/login',{
            method:'POST',
            mode:'cors',
            credentials: "include",
            body: new URLSearchParams({
                'username': username,
                'password': password,
            })
        })
        console.log(res)
        if(res.status===401){
            setError({
                existe:true,
                mensaje:"Usuario y contraseña incorrecta"
            })
        }
        else if(res.status===200){
            // No se, redirect a la pagina principal
            setError({
                existe:false,
                mensaje:""
            })

        }
    }
    
    return (
    <>
        <LongButton>Jugar Partida</LongButton>
        <LongButton onClick={() => setGlobalState(<Personalizar/>)}>Personalizar</LongButton>
        <LongButton onClick={() => setGlobalState(<Amigos/>)}>Amigos</LongButton>
        <LongButton onClick={() => setGlobalState(<Formato/>)}>Salir</LongButton>
    </>
    )
}