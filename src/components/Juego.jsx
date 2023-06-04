import {
    Button,
    Center,
    Grid,
    GridItem,
    HStack,
    VStack,
    Box,
    Modal,
    ModalOverlay,
    ModalFooter,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    keyframes,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    Icon,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiArrowPath } from "react-icons/hi2";
import { BsArrowClockwise } from "react-icons/bs";
import { useGlobalState } from "./GlobalState";
// import { Registro } from './Registro';
import { Inicio } from "./Inicio";
import { Carta } from "./Carta";
import { Top } from "./Top";
import { useEffect } from "react";
import { socket } from "../socket";

export default function Juego({username}) {
    console.log(username);
    const [tengoPartida, setTengoPartida] = useState(false);
    const toast = useToast();

    const [, setGlobalState] = useGlobalState();
    const [unoPulsado, setUnoPulsado] = useState(false);
    const [jugadores, setJugadores] = useState([{}]);

    /* 
    const [jugadores, setJugadores] = useState([
        {
            nombre: "ana123",
            nivel: 22,
            puntos: 100,
        },
        {
            nombre: "jorge234",
            nivel: 34,
            puntos: 200,
        },
        {
            nombre: "luis345",
            nivel: 5,
            puntos: 450,
        },
        {
            nombre: "maria456",
            nivel: 41,
            puntos: 300,
        }
    ]);
    */
    const [misCartas, setMisCartas] = useState([{}]);
    const [cartaDescartes, setCartaDescartes] = useState();

    const [cartasJugador2, setCartasJugador2] = useState([
        {
            numero: 1,
            color: "red",
            accion: null,
        },
        {
            numero: 2,
            color: "blue",
            accion: null,
        },
        {
            numero: 1,
            color: "red",
            accion: null,
        },
        {
            numero: 2,
            color: "blue",
            accion: null,
        },
        {
            numero: 1,
            color: "red",
            accion: null,
        },
        {
            numero: 2,
            color: "blue",
            accion: null,
        },
    ]);

    const [cartasJugador3, setCartasJugador3] = useState([
        {
            numero: 1,
            color: "red",
            accion: null,
        },
        {
            numero: 2,
            color: "blue",
            accion: null,
        },
    ]);

    const [cartasJugador4, setCartasJugador4] = useState([
        {
            numero: 1,
            color: "red",
            accion: null,
        },
        {
            numero: 2,
            color: "blue",
            accion: null,
        },
    ]);

    const [otrosJugadores, setOtrosJugadores] = useState([]);

    const jugadorArriba = () => {
        switch (otrosJugadores.length) {
        // Si solo hay otro jugador
        case 1:
            return (
                <Carta color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo="minimalista"/>
            );
            // Si hay tres jugadores debe quedarse en blanco    
        case 2:
            return <></>;
            // Si hay cuatro 4 jugadores
        case 3:
            return (
                <Carta color="black" accion="uno" numCartas={otrosJugadores[1].mano.length} estilo="minimalista"/>
            );
        default:
            return <></>;
        }
    };

    const jugadorIzq = () => {
        switch (otrosJugadores.length) {
        // Si solo hay otro jugador debe quedarse en blanco
        case 1:
            return <></>;
            
        // Si hay tres jugadores debe ser el siguiente a el propio
        case 2:
            return (
                <Carta color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo="minimalista"/>
            );
        // Si hay cuatro 4 jugadores
        case 3:
            return (
                <Carta color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo="minimalista"/>
            );
        default:
            return <></>;
        }
    };
    
    const jugadorDcha = () => {
        switch (otrosJugadores.length) {
        // Si solo hay otro jugador debe quedarse en blanco
        case 1:
            return <></>;
            
        // Si hay tres jugadores debe ser el siguiente del siguiente a el propio
        case 2:
            return (
                <Carta color="black" accion="uno" numCartas={otrosJugadores[1].mano.length} estilo="minimalista"/>
            );
        // Si hay cuatro 4 jugadores
        case 3:
            return (
                <Carta color="black" accion="uno" numCartas={otrosJugadores[2].mano.length} estilo="minimalista"/>
            );
        default:
            return <></>;
        }
    };


    const handleJugarCarta = () => {
        setUnoPulsado(false);
        // console.log(`numero: ${numero} color: ${color} numero: ${numero}`);
    };

    const actualizarPartida = (partida) => {
        // Entonces es la primera vez que recibo la partida
        if (!tengoPartida){
            // Mostrar mensaje de partida encontrada
            toast({
                title: "Se ha encontrado una partida",
                status: "success",
                position: "top",
                duration: 3000,
            });

        }
        setTengoPartida(true);
        // Actualizo la lista de jugadores
        const listaJugadores = [];
        for (const jugador of partida.jugadores){
            listaJugadores.push({
                nombre: jugador.username,
                nivel: Math.trunc((jugador.puntos) / 100),
                numCartas: jugador.mano.length
            });
        } 
        console.log(listaJugadores);
        setJugadores(listaJugadores);

        // Actualizo mis cartas
        const cartas = partida.jugadores.filter((j)=>j.username===username)[0].mano;
        console.log(cartas);
        setMisCartas(cartas);

        // Actualizo la carta de descartes
        setCartaDescartes(partida.mazoDescartes.at(-partida.mazoDescartes.length));
        console.log(cartaDescartes);

        // Actualizo los otros jugadores
        // Debo ordenador sabiendo mi posicion
        const miPosicion = partida.jugadores.findIndex((j)=>j.username===username);
        console.log("mi posicion es: " + miPosicion);
        const jugadoresAux = [];
        for (var i = 1; i < partida.jugadores.length; i++){
            jugadoresAux.push(partida.jugadores[(miPosicion + i) % partida.jugadores.length]);
        }
        console.log("Otros jugadores:");
        console.log(jugadoresAux);
        setOtrosJugadores(jugadoresAux);

        console.log(JSON.stringify(partida, null, 2));
    };

    useEffect(()=>{
        socket.emit("buscarPartida");

        socket.on("partida", actualizarPartida);

        socket.on("disconnect", ()=>{setGlobalState(<Inicio/>);});
    },[]);

    const spin = keyframes`  
    from {transform: rotate(0deg);}   
    to {transform: rotate(360deg)} 
    `;
    const spinAnimation = `${spin} infinite 2s linear`;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);

    console.log("jugador de arriba: ");
    console.log(jugadorArriba());

    if (!tengoPartida){
        return (
            <Center minH="100%">
                NO HAY PARTIDA AUN
            </Center>
        );
    }
    
    else return (
        
        <Grid
            templateColumns="repeat(11, 1fr)"
            templateRows="repeat(1, 1fr)"
            columnGap={0}
            rowGap={0}
        >
            <GridItem colStart="1" colEnd="3" w="100%" h="20vh" bg="blue.500">
                <Center minH="100%">
                    <Button fontSize="3xl" position="relative" maxW="100%" width="8em" height="3em" size="lg"
                        onClick={() => {
                            socket.emit("abandonarPartida");
                            toast({
                                title: "Partida abandonada correctamente",
                                status: "success",
                                position: "top",
                                duration: 3000,
                            });
                            setGlobalState(<Inicio />);
                        }}>
                        Salir del juego
                    </Button>
                </Center>
            </GridItem>
            <GridItem colStart="3" colEnd="8" w="100%" bg="blue.500">
                <HStack minH="100%" alignItems="center" ml="65%">
                    {/* Hueco para el jugaor de arriba 
                        <Carta color="black" accion="uno" numCartas={cartasJugador3.length} estilo="minimalista"/>
                    */}
                    
                    {jugadorArriba()}
                </HStack>
            </GridItem>
            <GridItem colStart="8" colEnd="12" w="100%" bg="blue.500">
                <Box>
                    {jugadores.map((jugador, key) => (
                        <Top
                            key={"jugador-"+key}
                            nombre={jugador.nombre}
                            nivel={jugador.nivel}
                            numCartas={jugador.numCartas}
                        />
                    ))}
                </Box>
            </GridItem>
            <GridItem colStart="1" colEnd="3" w="100%" h="49vh" bg="blue.500">
                <VStack minH="100%" alignItems="center" justifyContent="center">
                    {/* La carta del jugador de la izquierda */}
                    {jugadorIzq()}
                </VStack>
            </GridItem>
            <GridItem colStart="3" colEnd="10" w="100%" bg="blue.500">
                <Center position={"fixed"} left={"50%"} right={"50%"} top={"17%"} minH={"50%"}>
                    <Icon opacity={"60%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={BsArrowClockwise}/>
                </Center>
                <HStack style={{ zIndex: 2 }} minH="100%" alignItems="center" justifyContent="center">
                    <Carta color="black" accion="mazo" estilo="minimalista"/>
                    {/* La carta del mazo de descartes */}
                    <Carta accion={cartaDescartes.accion} numero={cartaDescartes.numero} color={cartaDescartes.color} estilo="clasico" />
                    <>
                        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Elige el color al que deseas cambiar</ModalHeader>
                                <ModalCloseButton />

                                <ModalBody>
                                    <HStack>
                                        <Button
                                            fontSize="xl"
                                            colorScheme="red"
                                        >
                                            Rojo
                                        </Button>
                                        <Button
                                            fontSize="xl"
                                            colorScheme="blue"
                                        >
                                            Azul
                                        </Button>
                                        <Button
                                            fontSize="xl"
                                            colorScheme="green"
                                        >
                                            Verde
                                        </Button>
                                        <Button
                                            fontSize="xl"
                                            colorScheme="yellow"
                                            textColor="white"
                                        >
                                            Amarillo
                                        </Button>
                                    </HStack>
                                </ModalBody>

                            </ModalContent>
                        </Modal>
                    </>
                </HStack>
            </GridItem>
            <GridItem colStart="10" colEnd="12" w="100%" bg="blue.500">
                <VStack minH="100%" alignItems="center" justifyContent="center">
                    {/* La carta del jugador de la derecha */}
                    {jugadorDcha()}
                </VStack>
            </GridItem>
            <GridItem colStart="1" colEnd="3" w="100%" h="30vh" bg="blue.500">
                <Center minH="100%">
                    <Button onClick={()=>{
                        socket.emit("robarCarta");
                    }} fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
                        Robar
                    </Button>
                </Center>
            </GridItem>
            <GridItem colStart="3" colEnd="10" w="100%" bg="blue.500">
                <HStack minH="100%" alignItems="center" justifyContent="center">
                    {misCartas.map((carta) => {
                        switch (carta.accion) {
                        case "cambio color":
                            return (
                                <Carta onClick={onOpen} numero={carta.numero} color={carta.color} accion={carta.accion} />
                            );
                        case "roba 4":
                            return (
                                <Carta onClick={onOpen} numero={carta.numero} color={carta.color} accion={carta.accion} />
                            );
                        default:
                            return (
                                <Carta onClick={() => { handleJugarCarta();}} numero={carta.numero} color={carta.color} accion={carta.accion} />
                            );
                        }
                    })}

                </HStack>
            </GridItem>
            <GridItem colStart="10" colEnd="12" w="100%" bg="blue.500">
                <Center minH="100%">
                    <Popover
                        isOpen={((misCartas.length === 2 && !unoPulsado))}
                        onOpen={onOpen}
                        onClose={onClose}
                        placement="top-start"
                    >
                        <PopoverTrigger>
                            <Button onClick={()=>{{
                                setUnoPulsado(true);
                            }}} 
                            isDisabled={misCartas.length !== 2 || unoPulsado} fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
                                UNO!
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverHeader fontWeight="semibold">¡Solo te quedan 2 cartas!</PopoverHeader>  
                            <PopoverArrow />
                            <PopoverBody>
                                Pulsa el boton UNO! antes de lanzar tu próxima carta
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Center>
            </GridItem>
        </Grid>
    );
}
