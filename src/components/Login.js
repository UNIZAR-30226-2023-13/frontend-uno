import React from "react";
import { Button } from "./Button";
import { StyledTextField } from "./StyledTextField";

const handleSubmit = (e) => {
    e.preventDefault()
}

export const Login = () => {
    return (
         <>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="userInputHolder">
                    <StyledTextField type="user" label="Nombre de usuario" variant="outlined"> </StyledTextField> 
                </div>
                <div className="passwordInputHolder">
                    <StyledTextField type="password" label="Contraseña" variant="outlined" />
                </div>
            <div className="buttonHolder">
                <div className="entrarHolder">
                    <Button type="submit">Entrar</Button>
                </div>
                <div className="noHayCuentaHolder">
                     <Button type="submit">¿No tienes cuenta?</Button>
                </div>
            </div>
        </form>
        </>
    )
}