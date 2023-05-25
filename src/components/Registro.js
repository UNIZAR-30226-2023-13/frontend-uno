import React, { useState } from "react";
import { Button, LongButton } from "./Button";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { StyledTextField } from "./StyledTextField";
import { Box } from "@mui/material";
import { Login } from "./Login";


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

export const Registro = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const nombre = e.target.user.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        console.log(nombre)
        // Si los datos no son coherentes
        if (password === confirmPassword && password!==''){
            setTextoModal('Cuenta creada correctamente')
            setAbierto(true)   
            setCuentaCreada(true);
        }
        // Si los datos son coherentes
        else{
            // Llamada a la API
            setTextoModal('Las contraseñas no coinciden')
            setAbierto(true)           
        }
    }

    const [cuentaCreada, setCuentaCreada] = useState(false);
    const [abierto, setAbierto] = useState(false);
    const [textoModal,setTextoModal] = useState('');
    const handleOpen = () => setAbierto(true);
    const handleClose = () => setAbierto(false);

    if(!cuentaCreada){
        return (
        <>
            <h1>Crear cuenta</h1>
            <form onSubmit={handleSubmit}>
                <div className="usernameInputHolder">
                    <StyledTextField id='user' type="user" label="Nombre de usuario" variant="outlined"> </StyledTextField> 
                </div>
                <div className="emailInputHolder">
                    <StyledTextField id='email' type="email" label="Correo electrónico" variant="outlined" />
                </div>
                <div className="password2InputHolder">
                    <StyledTextField id='password' type="password" label="Contraseña" variant="outlined" />
                </div>
                <div className="confirmPasswordInputHolder">
                    <StyledTextField id='confirmPassword' type="password" label="Confirmar contraseña" variant="outlined" />
                </div>
                <div className="buttonHolder">
                    <div className="crearHolder">
                        <LongButton type='submit'>Crear</LongButton>
                        <Modal 
                            open={abierto}
                            onClose={handleClose}
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
                                        <Button onClick={handleClose}>Cerrar</Button>
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
    else{
        return (
            <Login></Login>
        )
    }
    
}