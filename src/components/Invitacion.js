import React, { useState } from "react";
import { Button } from './Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const estilo = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Invitacion = (props) => {
    
    const handleSubmit = (e) => {
        e.preventDefault()

        // Si se ha pulsado sobre "Invitar"
        if (abiertoInvitar == true){
            setTextoModal('Invitacion enviada correctamente')
        }
        // Si se ha pulsado sobre "Eliminar"
        else{
            setTextoModal('¿Estás seguro de eliminarlo?') //Habrá que añadir el nombre
        }
    }

    

    const handleOpenInvitar = () => setAbiertoInvitar(true);
    const handleCloseInvitar = () => setAbiertoInvitar(false);
    const handleOpenEliminar = () => setAbiertoEliminar(true);
    const handleCloseEliminar = () => setAbiertoEliminar(false);
    const [textoModal,setTextoModal] = useState('');
    const [abiertoInvitar, setAbiertoInvitar] = useState(false);
    const [abiertoEliminar, setAbiertoEliminar] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='divAmigo'>
                    <NotificationsActiveIcon sx={{ fontSize:100, paddingRight:10, paddingLeft: 10}}></NotificationsActiveIcon>
                    <h2 className="nombreUsuarioInvitacion">{props.username}</h2>
                    <h2 className="invitacionRecibida">¡Invitacion recibida!</h2>
                    <div className='botonInvitar'>
                        <Button type='submit'>Aceptar</Button>
                    </div>
                    <div className='botonEliminar'>
                        <Button type='submit'>Rechazar</Button>
                    </div>
                </div>
            </form>
        </>
    )
} 