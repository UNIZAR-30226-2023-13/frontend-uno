import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Button } from './Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { DisabledButton } from "./DisabledButton";

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


export const AmigoDesconectado = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        setTextoModal('¿Estás seguro de eliminarlo?') //Habrá que añadir el nombre
    }

    const [nombreYEstado, setNombreYEstado] = useState({
        username: 'sonia123456',
        estado: 'Desconectado',
    });

    const handleOpenEliminar = () => setAbiertoEliminar(true);
    const handleCloseEliminar = () => setAbiertoEliminar(false);
    const [textoModal,setTextoModal] = useState('');
    const [abiertoEliminar, setAbiertoEliminar] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='divAmigo'>
                    <PersonIcon sx={{ fontSize:100, paddingRight:10, paddingLeft: 10}}></PersonIcon>
                    <div className='nombreUsuarioDesconectado'>
                        <h2>{nombreYEstado.username}</h2>
                    </div>
                    <div className='estadoUsuarioDesconectado'>
                        <h2>{nombreYEstado.estado}</h2>
                    </div>
                    <div className='botonInvitar'>
                        <DisabledButton type='button' disabled>Invitar</DisabledButton>
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