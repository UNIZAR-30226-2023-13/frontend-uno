import React, { useState } from "react";
import { Button } from "./Button";
import { StyledTextField } from "./StyledTextField";
import { Registro } from "./Registro";
import { Inicio } from "./Inicio";
import { useGlobalState } from "./GlobalState";

export const Login = () => {
    const [ globalState, setGlobalState ] = useGlobalState()
    const [noTienesCuentaPulsado, setNoTienesCuentaPulsado] = useState(false);
    const [sesionIniciada, setSesionIniciada] = useState(false);

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
    
    if(!noTienesCuentaPulsado){
        return (
         <>
        
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="userInputHolder">
                    <StyledTextField id="username" type="user" label="Nombre de usuario" variant="outlined"> </StyledTextField> 
                </div>
                <div className="passwordInputHolder">
                    <StyledTextField id="password" type="password" label="Contraseña" variant="outlined" />
                </div>
                {error.existe &&
                    <h2>
                    {error.mensaje}
                    </h2>
                }
                <div className="buttonHolder">
                        <div className="entrarHolder">
                            <Button onClick={()=> setGlobalState(<Inicio/>)} type="submit" >Entrar</Button>
                        </div>
                        <div className="noHayCuentaHolder">
                            <Button onClick={()=> setNoTienesCuentaPulsado(true)}type="button" >¿No tienes cuenta?</Button>
                        </div>
                </div>
            </form>
        </>
        )
    }
    else if(noTienesCuentaPulsado){
        return (
            <Registro></Registro>
        )
    }
    else if(sesionIniciada){
        return (
            <Inicio></Inicio>
        )
    }
}