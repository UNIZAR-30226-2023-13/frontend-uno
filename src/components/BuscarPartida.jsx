import {
    Text,
    Spinner,
    VStack,
    Button,
    Center,
} from "@chakra-ui/react";
import { socket } from "../socket";
import { useGlobalState } from "./GlobalState";
import { Inicio } from "./Inicio";


export function BuscarPartida() {
    const [, setGlobalState] = useGlobalState();
    return (
        <Center h={"100vh"}
            w={"100vw"}>
            <VStack gap={8} >
                <Text pt="1em" fontSize="4xl">Buscando partida...</Text>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
                <Button onClick={()=>{
                    socket.disconnect();
                    setGlobalState(<Inicio/>);
                }}>
                    Cancelar busqueda
                </Button>
            </VStack>
            
        </Center>
    );
}
