import { Button, LongButton } from "./Button";
import { Amigo } from "./Amigo"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Amigos = () => {
    return (
        <div className="amigos">
            <div className="fila1">
                <div className="leftButton">
                    <Button>
                        <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                    </Button>
                </div>
                <div className="centerButton">
                    <Button>Amigos</Button>
                    <Button>Invitaciones</Button>
                </div>
                <div className="rightButton">
                    <Button>
                        <ArrowBackIcon sx={{ fontSize:50 }}></ArrowBackIcon>
                    </Button>
                </div>
            </div>
            <div className="fila2">
                <Amigo></Amigo>
            </div>
        </div>
    )
}