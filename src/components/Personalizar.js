import { Button, LongButton } from "./Button";
import { AmigoConectado } from "./AmigoConectado"
import { AmigoDesconectado } from "./AmigoDesconectado"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import React, { useState } from "react";
import { Invitacion } from "./Invitacion";
import { TextField } from "@mui/material";
import { StyledTextField } from "./StyledTextField";
import { StyledTextField2 } from "./StyledTextField2";
import { Img2 } from "./Img";
import { SliderTablero } from "./SliderTablero";
import { SliderBaraja } from "./SliderBaraja";

export const Personalizar = (props) => {

    const [tableroPulsado, setTableroPulsado] = useState(false);
    const [barajaPulsado, setBarajaPulsado] = useState(false);
    const [atrasPulsado, setAtrasPulsado] = useState(false);

    const abrirTablero = () => {
        setBarajaPulsado(false);
        setTableroPulsado(true);
    }
    const abrirBaraja = () => {
        setBarajaPulsado(true);
        setTableroPulsado(false);
    }

    if(!tableroPulsado && !barajaPulsado){
        return (
            <div className="personalizar">
                <div className="fila1">
                    <div className="leftButton2">
                        <Button>
                            <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                        </Button>
                    </div>
                    <div className="seccionPersonalizar">
                        <h1>Personalizar</h1>
                    </div>
                    <div className="rightButton2">
                        <Button>Nivel {props.nivel}</Button>
                    </div>
                </div>
                <div className="fila2">
                    <div className="fotosPersonalizar">
                        <div className="fotoTablero">
                            <Img2 src="https://img.freepik.com/vector-premium/diseno-fondo-tablero-ajedrez_36244-122.jpg?w=2000"></Img2>
                        </div>
                        <div className="fotoBaraja">
                            <Img2 src="https://todoaplazo.com/images/products/be4779f2-d205-4d08-b9f2-7d4f36d540fa-uno2.png"></Img2>
                        </div>
                    </div>
                    <div className="botonesPersonalizar">
                        <div className="botonTablero">
                            <Button onClick={abrirTablero}>Tablero</Button>
                        </div>
                        <div className="botonBaraja">
                            <Button onClick={abrirBaraja}>Baraja</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if(tableroPulsado) {
        return (
            <div className="personalizar">
                <div className="fila1">
                    <div className="leftButton">
                        <Button>
                            <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                        </Button>
                    </div>
                    <div className="buttonAmigos">
                        <LongButton onClick={abrirTablero}>Tablero</LongButton>
                    </div>
                    <div className="buttonInvitaciones">
                        <LongButton onClick={abrirBaraja}>Baraja</LongButton>
                    </div>
                    <div className="rightButton3">
                        <Button>Nivel {props.nivel}</Button>
                    </div>
                </div>
                <div className="fila2">
                    <SliderTablero></SliderTablero>
                </div>
            </div>
        )
    }
    else if(barajaPulsado){
        return (
            <div className="personalizar">
                <div className="fila1">
                    <div className="leftButton">
                        <Button>
                            <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                        </Button>
                    </div>
                    <div className="buttonAmigos">
                        <LongButton onClick={abrirTablero}>Tablero</LongButton>
                    </div>
                    <div className="buttonInvitaciones">
                        <LongButton onClick={abrirBaraja}>Baraja</LongButton>
                    </div>
                    <div className="rightButton3">
                        <Button>Nivel {props.nivel}</Button>
                    </div>
                </div>
                <div className="fila2">
                    <SliderBaraja></SliderBaraja>
                </div>
            </div>
        )
    }
}