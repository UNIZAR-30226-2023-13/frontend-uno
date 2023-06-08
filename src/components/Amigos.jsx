import {
    VStack,
    StackDivider,
    HStack,
    Button,
    Text,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
    useDisclosure,
    Wrap,
    WrapItem,
    useToast,
    Box,
    CircularProgress
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { CartaInvitacion } from "./CartaInvitacion";
import { CartaSocial } from "./CartaSocial";
import { useGlobalState } from "./GlobalState";
import Login from "./Login";

export function Amigos() {
    const handleAceptarSolicitud = async(nombre) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", nombre);

        var requestOptions = {
            method: "POST",
            redirect: "follow",
            body: urlencoded,
            credentials: "include"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/amigos/anadir_amigo", requestOptions)
            .then(response => {
                if (response.status === 200){
                    toast({
                        title: "Solicitud enviada correctamente",
                        status: "success",
                        position: "top",
                    });
                }
                else if (response.status === 400){
                    toast({
                        title: "¡No puedes enviarte una invitacion a ti mismo!",
                        status: "warning",
                        position: "top",
                    });
                }
                else if(response.status === 409){
                    toast({
                        title: "Ya sois amigos",
                        status: "info",
                        position: "top",
                    });
                }
                else if(response.status === 500){
                    toast({
                        title: "Ha sucedido un error",
                        status: "error",
                        position: "top",
                    });
                }
            })
            .then(async result => {
                await verAmigos();
                await verInvitaciones();
                console.log(result);})
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    const handleRechazarSolicitud = async(nombre) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", nombre);

        var requestOptions = {
            method: "POST",
            redirect: "follow",
            body: urlencoded,
            credentials: "include"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/amigos/eliminar_invitacion", requestOptions)
            .then(response => {
                if (response.status === 200){
                    toast({
                        title: "Solicitud eliminada correctamente",
                        status: "success",
                        position: "top",
                    });
                }
                else if (response.status === 400){
                    toast({
                        title: "No se ha podido eliminar la solicitud",
                        status: "error",
                        position: "top",
                    });
                }
            })
            .then(async result => {
                await verInvitaciones();
                console.log(result);})
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    const verAmigos = async () => {
        console.log("recibiendo amigos");

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/amigos", requestOptions)
            .then(response => {
                if (response.status === 200){   
                    return response.json();
                }
                else if(response.status === 500){
                    toast({
                        title: "Ha sucedido un error",
                        status: "error",
                        position: "top",
                    });
                }
            })
            .then(result => {
                console.log(result);
                setAmigo(result);
                setLoadedAmigos(true);
            })
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    const verInvitaciones = async () => {
        console.log("recibiendo invitaciones");
        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/amigos/invitaciones", requestOptions)
            .then(response => {
                if (response.status === 200){   
                    return response.json();
                }
                else if(response.status === 500){
                    toast({
                        title: "Ha sucedido un error",
                        status: "error",
                        position: "top",
                    });
                }
            })
            .then(result => {
                console.log(result);
                setLoadedInvitaciones(true);
                setInvitacion(result);
            })
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    const handleEnviarInvitacion = async (e) => {
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", usuarioAInvitar);

        var requestOptions = {
            method: "POST",
            redirect: "follow",
            body: urlencoded,
            credentials: "include"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/amigos/enviar_invitacion", requestOptions)
            .then(response => {
                if (response.status === 200){
                    toast({
                        title: "Solicitud enviada correctamente",
                        status: "success",
                        position: "top",
                    });
                    setUsuarioAInvitar("");
                }
                else if (response.status === 400){
                    toast({
                        title: "¡No puedes enviarte una invitacion a ti mismo!",
                        status: "warning",
                        position: "top",
                    });
                }
                else if(response.status === 409){
                    toast({
                        title: "Ya sois amigos",
                        status: "info",
                        position: "top",
                    });
                }
                else if(response.status === 500){
                    toast({
                        title: "Ha sucedido un error",
                        status: "error",
                        position: "top",
                    });
                }
            })
            .then(async result => {
                await verAmigos();
                await verInvitaciones();
                console.log(result);
            })
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    const handleEliminarAmigo = async (nombre) => {

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", nombre);

        var requestOptions = {
            method: "POST",
            body: urlencoded,
            credentials: "include",
            redirect: "follow"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/amigos/eliminar_amigo", requestOptions)
            .then(async response => {
                await verAmigos();
                if (response.status === 200){
                    toast({
                        title: "Amigo eliminado correctamente",
                        status: "success",
                        position: "top",
                    });
                }
                else if(response.status === 409){
                    toast({
                        title: "Ya no erais amigos",
                        status: "warning",
                        position: "top",
                    });
                }
                else if(response.status === 500){
                    toast({
                        title: "Ha sucedido un error",
                        status: "error",
                        position: "top",
                    });
                }
                response.text();
            })
            .then(result => console.log(result))
            .catch(() => {
                toast({
                    title: "No se puede conectar con el servidor",
                    description: "Compruebe su conexión a Internet",
                    status: "error",
                    position: "top",
                });
                setGlobalState(<Login/>);
            });
    };

    useEffect(()=>{
        verAmigos();
        verInvitaciones();
        // Si queremos que se actualice la lista de amigos cada 10 segundos
        const intervalId = setInterval(() => {
            verAmigos();
            verInvitaciones();
        }, 1000 * 10); // in milliseconds
        return () => clearInterval(intervalId);
    },[]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [loadedAmigos, setLoadedAmigos] = useState(false);
    const [loadedInvitaciones, setLoadedInvitaciones] = useState(false);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [usuarioAInvitar,setUsuarioAInvitar] = useState("");
    const [amigo, setAmigo] = useState([]);
    const [invitacion, setInvitacion] = useState([]);
    const [,setGlobalState] = useGlobalState();

    return (
        <Box>
            <VStack paddingX="10%">
                <Text pt="1em" fontSize="4xl">
                     Amigos
                </Text>
                <Text align="center" pt="1em" fontSize="xl">
                    Aquí podrás ver tu lista de amigos y añadir nuevos por medio
                    de las invitaciones
                </Text>
            </VStack>
            <Center>
                <HStack pt="2em">
                    <Button onClick={onOpen}>Añadir amigo</Button>
                </HStack>
            </Center>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size="2xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="3xl">Invitaciones</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <form onSubmit={handleEnviarInvitacion}>
                                <FormLabel fontSize="2xl">
                                    Enviar solicitud a un nuevo usuario
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        value={usuarioAInvitar}
                                        pr="4.5rem"
                                        ref={initialRef}
                                        fontSize="xl"
                                        placeholder="Nombre de usuario"
                                        onChange={(e)=>setUsuarioAInvitar(e.target.value)}
                                    />
                                    <InputRightElement px="3rem" width="4.5rem">
                                        <Button
                                            colorScheme="blue"
                                            px="3rem"
                                            rightIcon={<FaPaperPlane />}
                                            type="submit" 
                                            loadingText="Submitting"
                                        >
                                            Enviar
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </form>
                        </FormControl>
                        <FormLabel fontSize="2xl" pt="1em">
                            Invitaciones recibidas
                        </FormLabel>
                        <VStack divider={<StackDivider/>}>
                            {!loadedInvitaciones ? <CircularProgress isIndeterminate color='yellow.400' /> : ""}
                            {invitacion.map((i, key) => (
                                <CartaInvitacion
                                    key={key}
                                    nombre={i.username}
                                    nivel={Math.trunc((i.puntos)/100)}
                                    aceptarSolicitud={handleAceptarSolicitud}
                                    rechazarSolicitud={handleRechazarSolicitud}
                                />
                            ))}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Wrap>
                <WrapItem>
                </WrapItem>
            </Wrap>
            <Center paddingY="20px" paddingX="10%">
                <VStack
                    py={5}
                    px={5}
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="center"
                    borderRadius="10px"
                    border="1px"
                    borderColor="gray.300"
                    minW={{ base: "70vw", lg: "auto" }}
                    boxShadow="0 0 2rem gray"
                    bg={"white"}
                >
                    {!loadedAmigos ? <CircularProgress isIndeterminate color='yellow.400' /> : ""}
                    {amigo.map((a, key) => (
                        <CartaSocial 
                            key={key}
                            conectado={a.conectado}
                            nombre={a.username}
                            nivel={Math.trunc((a.puntos)/100)}
                            handleEliminarAmigo={handleEliminarAmigo}
                        />
                    ))}
                    {amigo.length===0 && loadedAmigos ? 
                        <Text py={10} fontSize={"2xl"}>Aún no tienes amigos</Text>
                        : ""}
                </VStack>
            </Center>
        </Box>
    );
}
