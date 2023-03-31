import PersonIcon from '@mui/icons-material/Person';
import { Button } from './Button';

export const Amigo = () => {
    return (

        <>
            <div className='divAmigo'>
                <PersonIcon sx={{ fontSize:80, paddingRight:10}}></PersonIcon>
                <h2>nombreusuario</h2>
                <h2>estado</h2>
                <Button sx={{ paddingRight:50 }}>Invitar</Button>
                <Button>Eliminar</Button>
            </div>
        </>
    )
} 