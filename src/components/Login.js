import React from "react";
import { Button } from "./Button";
import { Img } from "./Img";
import { Input } from "./Input";
import { Label } from "./Label";

const handleSubmit = (e) => {
    e.preventDefault()

}

export const Login = () => {
    return (
        <form onSubmit={handleSubmit}>
            <Label for="user">Usuario</Label>
            <br></br>
            <Input type="user" id="user" name="user"></Input>
            <br></br>
            <br></br>
            <br></br>
            <Label for="password">Contraseña</Label>
            <br></br>
            <Input type="password" id="password" name="password"></Input>
            <br></br>
            <br></br>
            <br></br>
            <Button type="submit">Entrar</Button>
            <br></br>
            <br></br>
            <br></br>
            <Button type="submit">¿No tienes cuenta?</Button>
        </form>
    )
}