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
    Icon,
    useDisclosure,
    useToast,
    Text,
    Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSkullCrossbones, FaCrown } from "react-icons/fa";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";
import { useGlobalState } from "./GlobalState";
import { Inicio } from "./Inicio";
import { Carta } from "./Carta";
import { Top } from "./Top";
import { useEffect } from "react";
import { socket } from "../socket";
import { BuscarPartida } from "./BuscarPartida";

export default function Juego({username, tablero, cartas}) {
    const [tengoPartida, setTengoPartida] = useState(false);
    const [partidaActualizada, setPartidaActualizada] = useState(false);
    const toast = useToast();

    const [, setGlobalState] = useGlobalState();
    const [unoPulsado, setUnoPulsado] = useState(false);
    const [sentidoHorario, setSentidoHorario] = useState(true);
    const [jugadores, setJugadores] = useState([{}]);

    const [misCartas, setMisCartas] = useState([{}]);
    const [cartaDescartes, setCartaDescartes] = useState();

    const [otrosJugadores, setOtrosJugadores] = useState([]);

    const [jugadorConTurno, setJugadorConTurno] = useState("");



    const initialRef = React.useRef(null);
    const finalRef2 = React.useRef(null);

    const [ganador, setGanador] = useState("");

    const jugadorArriba = () => {
        switch (otrosJugadores.length) {
        // Si solo hay otro jugador
        case 1:
            
            return (
                
                <VStack 
                    className={otrosJugadores[0].username===jugadorConTurno ? "jugadorConTurno": ""}
                    gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo={cartas}/>
                    <Text  borderRadius={5} px={2} bgColor={"blackAlpha.900"} fontWeight="bold" zIndex={10} fontFamily={"body"} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[0].username}</Text>
                </VStack>
                
            );
            // Si hay tres jugadores debe quedarse en blanco    
        case 2:
            return <></>;
            // Si hay cuatro 4 jugadores
        case 3:
            return (
                <VStack
                    className={otrosJugadores[1].username===jugadorConTurno ? "jugadorConTurno": ""}
                    gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[1].mano.length} estilo={cartas}/>
                    <Text borderRadius={5} px={2} bgColor={"blackAlpha.900"} fontWeight="bold" zIndex={10} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[1].username}</Text>
                </VStack>
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
                <VStack 
                    className={otrosJugadores[0].username===jugadorConTurno ? "jugadorConTurno": ""}
                    gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo={cartas}/>
                    <Text  borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10}  casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[0].username}</Text>
                </VStack>
            );
        // Si hay cuatro 4 jugadores
        case 3:
            return (
                <VStack
                    className={otrosJugadores[0].username===jugadorConTurno ? "jugadorConTurno": ""}
                    gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo={cartas}/>
                    <Text  borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10}  casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[0].username}</Text>
                </VStack>
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
                <VStack
                    className={otrosJugadores[1].username===jugadorConTurno ? "jugadorConTurno": ""}
                    gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[1].mano.length} estilo={cartas}/>
                    <Text  borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[1].username}</Text>
                </VStack>
                
            );
        // Si hay cuatro 4 jugadores
        case 3:
            return (
                <VStack
                    className={otrosJugadores[2].username===jugadorConTurno ? "jugadorConTurno": ""}
                    gap={4}>
                    <Carta fontWeight="bold" zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[2].mano.length} estilo={cartas}/>
                    <Text  borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[2].username}</Text>
                </VStack>
            );
        default:
            return <></>;
        }
    };


    const sentidoJuego = () => {
        switch (cartaDescartes.color){
        case "verde":
            return (
                <Icon  color="green" opacity={"80%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={(sentidoHorario ? BsArrowClockwise : BsArrowCounterclockwise)}/>
            );
        case "amarillo":
            return (
                <Icon  color="yellow" opacity={"80%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={(sentidoHorario ? BsArrowClockwise : BsArrowCounterclockwise)}/>
            );
        case "rojo":
            return (
                <Icon  color="red" opacity={"80%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={(sentidoHorario ? BsArrowClockwise : BsArrowCounterclockwise)}/>
            );
        case "azul":
            return (
                <Icon  color="blue.800" opacity={"80%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={(sentidoHorario ? BsArrowClockwise : BsArrowCounterclockwise)}/>
            );
        default:
            return (
                <Icon  color="white" opacity={"80%"} fillOpacity={1} size={"2px"} boxSize={480} animation={spinAnimation} as={(sentidoHorario ? BsArrowClockwise : BsArrowCounterclockwise)}/>
            );
        }
    };


    const actualizarPartida = (partida) => {
        if (!partida) return;

        setPartidaActualizada(true);

        // Actualizo la lista de jugadores
        const listaJugadores = [];
        for (const jugador of partida.jugadores){
            listaJugadores.push({
                nombre: jugador.username,
                nivel: Math.trunc((jugador.puntos) / 100),
                numCartas: jugador.mano.length
            });
        } 
        listaJugadores.sort((j1,j2)=>j1.numCartas - j2.numCartas);
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
        setOtrosJugadores(jugadoresAux);

        // En caso de finalizada
        if (partida.finalizado){
            modalTopController.onOpen();
            setGanador(partida.ganador.username);
        }

        // Pongo el sentido
        setSentidoHorario(partida.sentidoHorario);

        // Actualizo el jugador con turno
        setJugadorConTurno(partida.jugadores[partida.turno].username);
        

        console.log(JSON.stringify(partida, null, 2));
    };

    console.log("sentido horario: " + sentidoHorario);

    useEffect(()=>{
        socket.emit("buscarPartida");

        socket.on("partida", actualizarPartida);

        socket.on("partida:abandono", (username) => {
            console.log("abandono de " + username);
            
            toast({
                title: "El jugador " + username + " ha abandonado la partida",
                status: "info",
                position: "top",
                duration: 2000,
            });
            
        });

        socket.on("disconnect", ()=>{setGlobalState(<Inicio/>);});

        return () => {
            socket.off("partida", actualizarPartida);
            socket.off("partida:abandono");
            socket.off("disconnect");
        };
    },[]);

    const spin = keyframes`  
    from {transform: rotate(0deg);}   
    to {transform: rotate(360deg)} 
    `;

    const spinReverse = keyframes`  
    from {transform: rotate(360deg);}   
    to {transform: rotate(0deg)} 
    `;
    const spinAnimation = (sentidoHorario ? spin : spinReverse) + " infinite 2s linear";

    if (!tengoPartida && partidaActualizada){
        setTengoPartida(true);
        toast({
            title: "Se ha encontrado una partida",
            status: "success",
            position: "top",
            duration: 3000,
        });
    }

    const modalCambioColorController = useDisclosure();
    const modalRobaCuatroController = useDisclosure();
    const modalTopController = useDisclosure();
    const finalRef = React.useRef(null);

    console.log("turno: " + jugadorConTurno);

    let texto;

    if (ganador === username) {
        texto = "¡Victoria!";
    } else {
        texto = "Derrota";
    }

    console.log("jugador de arriba: ");
    console.log(jugadorArriba());

    if (!tengoPartida){
        return (
            <Center minH="100%">
                <BuscarPartida/>
            </Center>
        );
    }
    
    else return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef2}
                isOpen={modalTopController.isOpen}
                onClose={modalTopController.onClose}
                size="2xl"
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign={"center"}>Fin de partida</ModalHeader>
                    <ModalBody pb={6}>
                        <VStack>
                            <Icon
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === username ? "yellow.500" : "black"
                                }
                                mr="2"
                                as={
                                    ganador === username
                                        ? FaCrown
                                        : FaSkullCrossbones
                                }
                            />
                            <Text
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === username ? "yellow.500" : "black"
                                }
                            >
                                {texto}
                            </Text>
                            <Divider></Divider>
                            <VStack pt="10px">
                                {jugadores.map((jugador, key) => (
                                    <Top
                                        key={"jugador-"+key}
                                        nombre={jugador.nombre}
                                        nivel={jugador.nivel}
                                        numCartas={jugador.numCartas}
                                    />
                                ))}
                            </VStack>
                            <Button 
                                onClick={() => {
                                    socket.emit("abandonarPartida");
                                    setGlobalState(<Inicio />);
                                }}>
                                    Volver a la pagina principal
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Grid
                className={tablero}
                
                bgGradient={(tablero === "clasico" ? "radial-gradient(purple.500, purple.900)" : "" )}
        
                templateColumns="repeat(11, 1fr)"
                templateRows="repeat(1, 1fr)"
                columnGap={0}
                rowGap={0}
            >
                <GridItem colStart="1" colEnd="3" w="100%" h="30vh">
                    <Center minH="100%" pb={10}>
                        <Button  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} overflow={"hidden"} textOverflow={"ellipsis"} position="relative" maxW={"90%"} height="3em" size="lg"
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
                <GridItem colStart="3" colEnd="8" w="100%">
                    
                    <HStack minH="100%" alignContent={"center"} pt={5} alignItems="center" ml={"65%"}>
                        {/* Hueco para el jugaor de arriba 
                            <Carta color="black" accion="uno" numCartas={cartasJugador3.length} estilo="clasico"/>
                        */}
                        
                        {jugadorArriba()}
                        
                    </HStack>
                    
                </GridItem>
                <GridItem colStart="8" colEnd="12" pt={10} w="100%">
                    <Box display={{base: "none", md: "block"}}>
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
                <GridItem colStart="1" colEnd="3" w="100%" h="45vh" >
                    <VStack minH="100%" pt={"3.5em"} alignItems="center" justifyContent="center">
                        {/* La carta del jugador de la izquierda */}
                        {jugadorIzq()}

                    </VStack>
                </GridItem>
                <GridItem colStart="3" colEnd="10" w="100%">
                    <Center position={"fixed"} left={"50%"} right={"50%"} top={"27%"} minH={"50%"}>
                        {sentidoJuego()}
                    </Center>
                    <HStack style={{ zIndex: 2 }} minH="100%" alignItems="center" justifyContent="center">
                        <Carta color="black" accion="mazo" estilo={cartas}/>
                        {/* La carta del mazo de descartes */}
                        <Carta accion={cartaDescartes.accion} numero={cartaDescartes.numero} color={cartaDescartes.color} tipo="descarte" estilo={cartas} />
                        <>
                            <Modal finalFocusRef={finalRef} isOpen={modalCambioColorController.isOpen} onClose={modalCambioColorController.onClose} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Elige el color al que deseas cambiar</ModalHeader>
                                    <ModalCloseButton />

                                    <ModalBody>
                                        <HStack>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="red"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "cambio color",
                                                            colorCambio: "rojo"
                                                        },
                                                        unoPulsado);
                                                
                                                    modalCambioColorController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Rojo
                                            </Button>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="blue"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "cambio color",
                                                            colorCambio: "azul"
                                                        },
                                                        unoPulsado);
                                                
                                                    modalCambioColorController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Azul
                                            </Button>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="green"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "cambio color",
                                                            colorCambio: "verde"
                                                        },
                                                        unoPulsado);
                                                
                                                    modalCambioColorController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Verde
                                            </Button>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="yellow"
                                                textColor="white"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "cambio color",
                                                            colorCambio: "amarillo"
                                                        },
                                                        unoPulsado);
                                                
                                                    modalCambioColorController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Amarillo
                                            </Button>
                                        </HStack>
                                    </ModalBody>

                                </ModalContent>
                            </Modal>
                        </>
                        <>
                            <Modal finalFocusRef={finalRef} isOpen={modalRobaCuatroController.isOpen} onClose={modalRobaCuatroController.onClose} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Elige el color al que deseas cambiar</ModalHeader>
                                    <ModalCloseButton />

                                    <ModalBody>
                                        <HStack>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="red"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "roba 4",
                                                            colorCambio: "rojo"
                                                        },
                                                        unoPulsado);
                                                    modalRobaCuatroController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Rojo
                                            </Button>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="blue"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "roba 4",
                                                            colorCambio: "azul"
                                                        },
                                                        unoPulsado);
                                                    modalRobaCuatroController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Azul
                                            </Button>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="green"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "roba 4",
                                                            colorCambio: "verde"
                                                        },
                                                        unoPulsado);
                                                    modalRobaCuatroController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
                                            >
                                                Verde
                                            </Button>
                                            <Button
                                                fontSize="xl"
                                                colorScheme="yellow"
                                                textColor="white"
                                                onClick={()=>{
                                                    socket.emit("jugarCarta", 
                                                        {
                                                            accion: "roba 4",
                                                            colorCambio: "amarillo"
                                                        },
                                                        unoPulsado);
                                                    modalRobaCuatroController.onClose();
                                                    setUnoPulsado(false);
                                                }
                                                }
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
                <GridItem colStart="10" colEnd="12" w="100%">
                    <VStack minH="100%" pt={"3.5em"} alignItems="center" justifyContent="center">
                        {/* La carta del jugador de la derecha */}
                        {jugadorDcha()}
                    </VStack>
                </GridItem>
                <GridItem  pb={{base: 60, md: 0}} colStart="1" colEnd="3" w="100%" h="25vh">
                    <Center minH="100%">
                        <Button onClick={()=>{
                            socket.emit("robarCarta"
                            );
                            setUnoPulsado(false);
                        }} fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
                            Robar
                        </Button>
                    </Center>
                </GridItem>
                <GridItem pt={{base: 20, md: 0}} colStart="3" colEnd="10" w="100%">
                    <Center w="inherit">
                        <HStack maxW={"100%"} w={"-webkit-fit-content"} className={username===jugadorConTurno ? "jugadorConTurno misCartas": "misCartas"} minH="100%" alignItems="center" justifyContent="center">
                            {misCartas.map((carta) => {
                                switch (carta.accion) {
                                case "cambio color":
                                    return (
                                        <Carta onClick={modalCambioColorController.onOpen} numero={carta.numero} color={carta.color} accion={carta.accion} posible={jugadorConTurno===username}/>
                                    );
                                case "roba 4":
                                    return (
                                        <Carta onClick={modalRobaCuatroController.onOpen} numero={carta.numero} color={carta.color} accion={carta.accion} posible={jugadorConTurno===username}/>
                                    );
                                default:
                                    return (
                                        <Carta
                                            onClick={() => {socket.emit("jugarCarta", 
                                                {
                                                    color: carta.color,
                                                    numero: carta.numero,
                                                    accion: carta.accion,
                                                },
                                                unoPulsado);
                                            setUnoPulsado(false);
                                            }}
                                            className="jugadorConTurno"
                                            estilo={cartas} numero={carta.numero} color={carta.color} accion={carta.accion} posible={jugadorConTurno===username && (carta.color===cartaDescartes.color || (carta.accion===cartaDescartes.accion && carta.accion!=undefined) || (carta.numero===cartaDescartes.numero && carta.numero!=undefined))}/>
                                    );
                                }
                            })}

                        </HStack>
                    </Center>
                </GridItem>
                <GridItem pb={{base: 60, md: 0}} colStart="10" colEnd="12" w="100%">
                    <Center minH="100%">
                        <Popover
                            isOpen={((misCartas.length === 2 && !unoPulsado) && username===jugadorConTurno)}
                            onOpen={modalTopController.onOpen}
                            onClose={modalTopController.onClose}
                            placement="top-start"
                        >
                            <PopoverTrigger>
                                <Button onClick={()=>{{
                                    setUnoPulsado(true);
                                }}} 
                                isDisabled={misCartas.length !== 2 || unoPulsado || username!==jugadorConTurno} fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
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
        </>
    );
}
