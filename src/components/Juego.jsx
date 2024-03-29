import {
    Button,
    Center,
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
    Flex,
    Spacer
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
    const [puedoRobar, setPuedoRobar] = useState(true);

    const jugadorArriba = () => {
        switch (otrosJugadores.length) {
        // Si solo hay otro jugador
        case 1:
            
            return (
                
                <VStack 
                    pt={20}    
                    className={otrosJugadores[0].username===jugadorConTurno ? "jugadorConTurno": ""}
                    position={"relative"}
                    gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo={cartas}/>
                    <Text top={"105%"} position={"absolute"} borderRadius={5} px={2} bgColor={"blackAlpha.900"} fontWeight="bold" zIndex={10} fontFamily={"body"} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[0].username}</Text>
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
                    gap={4}
                    position={"relative"}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[1].mano.length} estilo={cartas}/>
                    <Text top={"105%"} position={"absolute"} borderRadius={5} px={2} bgColor={"blackAlpha.900"} fontWeight="bold" zIndex={10} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[1].username}</Text>
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
                    position={"relative"} gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo={cartas}/>
                    <Text top={"105%"} position={"absolute"} borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10}  casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[0].username}</Text>
                </VStack>
            );
        // Si hay cuatro 4 jugadores
        case 3:
            return (
                <VStack
                    className={otrosJugadores[0].username===jugadorConTurno ? "jugadorConTurno": ""}
                    position={"relative"} gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[0].mano.length} estilo={cartas}/>
                    <Text top={"105%"} position={"absolute"} borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10}  casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[0].username}</Text>
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
                    position={"relative"} gap={4}>
                    <Carta zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[1].mano.length} estilo={cartas}/>
                    <Text top={"105%"} position={"absolute"} borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[1].username}</Text>
                </VStack>
                
            );
        // Si hay cuatro 4 jugadores
        case 3:
            return (
                <VStack
                    className={otrosJugadores[2].username===jugadorConTurno ? "jugadorConTurno": ""}
                    position={"relative"} gap={4}>
                    <Carta fontWeight="bold" zIndex={10} color="black" accion="uno" numCartas={otrosJugadores[2].mano.length} estilo={cartas}/>
                    <Text top={"105%"} position={"absolute"} borderRadius={5} px={2} bgColor={"blackAlpha.900"}  fontWeight="bold" zIndex={10} casing={"uppercase"} fontSize={"2xl"} color={"white"}>{otrosJugadores[2].username}</Text>
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
        

        // Actualizo el poderRobar
        setPuedoRobar(partida.puedeRobar);

        console.log(JSON.stringify(partida, null, 2));
    };

    console.log("sentido horario: " + sentidoHorario);

    useEffect(()=>{
        if (!username || username==undefined) {
            toast({
                title: "No se ha podido buscar partida",
                description: "Intentelo de nuevo",
                status: "error",
                position: "top",
                duration: 2000,
            });
            setGlobalState(<Inicio/>);
        }

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


    return (
        <>
            {/* Pack de modals */}
            {/* Modal de final de partida */}
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

            {/* Modal de cambio de color */}
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

            {/* Modal de roba cuatro */}
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

            {/* Flex global */}
            <Flex flexDirection={"column"}
                position={"relative"}
                className={tablero}
                h={"100vh"}
                w={"100vw"}
                bgGradient={(tablero === "clasico" ? "radial-gradient(purple.500, purple.900)" : (tablero === "minimalista" ? "radial-gradient(#e66465, #9198e5)" : "" ) )}
            >
                {/* Fila 1 */}
                <Flex position={"relative"} pt={10} flexDirection={"row"}>
                    {/* Boton Abandonar */}
                    <Center >
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

                    <Spacer/>

                    {/* Jugador arriba */}
                    <HStack position={"absolute"} transform={"translate(-50%, -50%)"} left={"50%"} top={"50%"} alignContent={"center"} alignItems="center">
                        {/* Hueco para el jugaor de arriba 
                            <Carta color="black" accion="uno" numCartas={cartasJugador3.length} estilo="clasico"/>
                        */}
                        
                        {jugadorArriba()}
                        
                    </HStack>

                    <Spacer/>

                    {/* Top */}
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
                </Flex>
                <Spacer/>
                {/* Fila 2 */}
                <Flex px={5} flexDirection={"row"}>
                    {/*Jugador de la izq */}
                    <VStack alignItems="center" justifyContent="center">
                        {jugadorIzq()}
                    </VStack>
                    <Spacer/>
                    {/* Mazos Centrales */}
                    <HStack position={"relative"} style={{ zIndex: 2 }} minH="100%" alignItems="center" justifyContent="center">
                        <Carta color="black" accion="mazo" estilo={cartas}/>
                        {/* La carta del mazo de descartes */}
                        <Carta accion={cartaDescartes.accion} numero={cartaDescartes.numero} color={cartaDescartes.color} tipo="descarte" estilo={cartas} />
                        {/* El sentido del juego */}
                        <Center position={"absolute"} transform={"translate(-50%, -50%)"} left={"50%"} top={"50%"}>
                            {sentidoJuego()}
                        </Center>
                    </HStack>
                        
                    <Spacer/>
                    {/* Jugador de la derecha */}
                    <VStack alignItems="center" justifyContent="center">
                        {/* La carta del jugador de la derecha */}
                        {jugadorDcha()}
                    </VStack>
                </Flex>
                <Spacer/>
                {/* Fila 3 */}
                <Flex px={4} pb={5} flexDirection={"row"}>
                    {/* Boton robar/pasar */}
                    <Button onClick={()=>{
                        if (puedoRobar){
                            socket.emit("robarCarta");
                        }
                        else{
                            socket.emit("pasarTurno");
                        }
                        setUnoPulsado(false);
                    }} fontSize="3xl" position="relative" maxW="100%" width="5em" height="3em" size="lg">
                        {(!puedoRobar && jugadorConTurno===username) ? "Pasar" : "Robar"}
                    </Button>
                    <Spacer/>
                    {/* Mazo propio */}
                    <HStack maxW={"100%"} w={"-webkit-fit-content"} className={username===jugadorConTurno ? "jugadorConTurno misCartas": "misCartas"} minH="100%" alignItems="center" justifyContent="center">
                        {misCartas.map((carta) => {
                            switch (carta.accion) {
                            case "cambio color":
                                return (
                                    <Carta onClick={() => {
                                        if (jugadorConTurno === username){
                                            modalCambioColorController.onOpen();
                                        }
                                    }} numero={carta.numero} color={carta.color} accion={carta.accion} posible={jugadorConTurno===username}/>
                                );
                            case "roba 4":
                                return (
                                    <Carta onClick={() => {
                                        if (jugadorConTurno === username){
                                            modalRobaCuatroController.onOpen();
                                        }
                                    }} numero={carta.numero} color={carta.color} accion={carta.accion} posible={jugadorConTurno===username}/>
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
                    <Spacer/>
                    {/* Boton UNO */}
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
                </Flex>
            </Flex>
        </>
    );
        
}
