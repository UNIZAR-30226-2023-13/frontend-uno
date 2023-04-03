import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Button } from './Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

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

export const AmigoConectado = (props) => {
    
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
                    <PersonIcon sx={{ fontSize:100, paddingRight:10, paddingLeft: 10}}></PersonIcon>
                    <h2 className="nombreUsuario">{props.username}</h2>
                    <h2 className="estadoUsuario">{props.estado}</h2>
                    <div className='botonInvitar'>
                        <Button type='submit' onClick={handleOpenInvitar}>Invitar</Button>
                        <Modal 
                                open={abiertoInvitar}
                                onClose={handleCloseInvitar}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={estilo}>
                                    <div className ="popup">
                                        <div className = "textoPopup">
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                {textoModal}
                                            </Typography>
                                        </div>
                                        <div className="botonCerrar">
                                            <Button onClick={handleCloseInvitar}>Ok</Button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                    </div>
                    <div className='botonEliminar'>
                        <Button type='submit' onClick={handleOpenEliminar}>Eliminar</Button>
                        <Modal 
                                open={abiertoEliminar}
                                onClose={handleCloseEliminar}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={estilo}>
                                    <div className ="popup">
                                        <div className = "textoPopup">
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                {textoModal}
                                            </Typography>
                                        </div>
                                        <div className="dosBotones">
                                            <div className="botonCancelar">
                                                <Button onClick={handleCloseEliminar}>Cancelar</Button>
                                            </div>
                                            <div className="botonConfirmar">
                                                <Button onClick={handleCloseEliminar}>Confirmar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                        </Modal>
                    </div>
                </div>
            </form>
        </>
    )
} 