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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiArrowPath } from "react-icons/hi2";
import { BsArrowClockwise } from "react-icons/bs";
import { useGlobalState } from "./GlobalState";
// import { Registro } from './Registro';
import { Inicio } from "./Inicio";
import { Carta } from "./Carta";
import { Top } from "./Top";

export default function Juego() {
    const [globalState, setGlobalState] = useGlobalState();
    const [unoPulsado, setUnoPulsado] = useState(false);
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
    const [cartasJugador1, setCartasJugador1] = useState([
        {
            numero: 1,
            color: "red",
            accion: null,
            estilo: "harry potter",
        },
        {
            numero: 2,
            color: "blue",
            accion: null,
            estilo: "clasico",
        },
    ]);

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

    const handleJugarCarta = () => {
        setUnoPulsado(false);
        // console.log(`numero: ${numero} color: ${color} numero: ${numero}`);
    };

    const spin = keyframes`  
    from {transform: rotate(0deg);}   
    to {transform: rotate(360deg)} 
    `;
    const spinAnimation = `${spin} infinite 2s linear`;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);

    return (
        <Grid
            templateColumns="repeat(11, 1fr)"
            templateRows="repeat(1, 1fr)"
            columnGap={0}
            rowGap={0}
        >
            <GridItem colStart="1" colEnd="3" w="100%" h="20vh" bg="blue.500">
                <Center minH="100%">
                    <Button fontSize="3xl" position="relative" maxW="100%" width="8em" height="3em" size="lg"
                        onClick={() => setGlobalState(<Inicio />)}>
                        Salir del juego
                    </Button>
                </Center>
            </GridItem>
            <GridItem colStart="3" colEnd="8" w="100%" bg="blue.500">
                <HStack minH="100%" alignItems="center" ml="65%">
                    <Carta color="black" accion="uno" numCartas={cartasJugador3.length} estilo="minimalista"/>
                </HStack>
            </GridItem>
            <GridItem colStart="8" colEnd="12" w="100%" bg="blue.500">
                <Box>
                    {jugadores.map((jugador) => (
                        <Top
                            nombre={jugador.nombre}
                            nivel={jugador.nivel}
                            puntos={jugador.puntos}
                        />
                    ))}
                </Box>
            </GridItem>
            <GridItem colStart="1" colEnd="3" w="100%" h="49vh" bg="blue.500">
                <VStack minH="100%" alignItems="center" justifyContent="center">
                    <Carta color="black" accion="uno" numCartas={cartasJugador2.length} estilo="minimalista"/>
                </VStack>
            </GridItem>
            <GridItem colStart="3" colEnd="10" w="100%" bg="blue.500">
                <Center position={"fixed"} left={"50%"} right={"50%"} top={"17%"} minH={"50%"}>
                    <Icon opacity={"60%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={BsArrowClockwise}/>
                </Center>
                <HStack style={{ zIndex: 2 }} minH="100%" alignItems="center" justifyContent="center">
                    <Carta color="black" accion="mazo" estilo="minimalista"/>
                    <Carta numero="2" color="blue.500" estilo="clasico" />
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
                    <Carta color="black" accion="uno" numCartas={cartasJugador4.length} estilo="minimalista"/>
                </VStack>
            </GridItem>
            <GridItem colStart="1" colEnd="3" w="100%" h="30vh" bg="blue.500">
                <Center minH="100%">
                    <Button fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
                        Robar
                    </Button>
                </Center>
            </GridItem>
            <GridItem colStart="3" colEnd="10" w="100%" bg="blue.500">
                <HStack minH="100%" alignItems="center" justifyContent="center">
                    {cartasJugador1.map((carta) => {
                        switch (carta.accion) {
                        case "cambio color":
                            return (
                                <Carta onClick={onOpen} numero={carta.numero} color={`${carta.color}.500`} accion={carta.accion} />
                            );
                            break;
                        case "roba 4":
                            return (
                                <Carta onClick={onOpen} numero={carta.numero} color={`${carta.color}.500`} accion={carta.accion} />
                            );
                            break;
                        default:
                            return (
                                <Carta onClick={() => { handleJugarCarta();}} numero={carta.numero} color={`${carta.color}.500`} accion={carta.accion} />
                            );
                            break;
                        }
                    })}

                </HStack>
            </GridItem>
            <GridItem colStart="10" colEnd="12" w="100%" bg="blue.500">
                <Center minH="100%">
                    <Popover
                        isOpen={((cartasJugador1.length === 2 && !unoPulsado))}
                        onOpen={onOpen}
                        onClose={onClose}
                        placement="top-start"
                    >
                        <PopoverTrigger>
                            <Button onClick={()=>{{
                                setUnoPulsado(true);
                            }}} 
                            isDisabled={cartasJugador1.length !== 2 || unoPulsado} fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
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
