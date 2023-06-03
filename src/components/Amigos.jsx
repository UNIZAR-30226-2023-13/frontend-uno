import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { CartaInvitacion } from "./CartaInvitacion";
import { CartaSocial } from "./CartaSocial";

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

        fetch("http://localhost:8000/amigos/anadir_amigo", requestOptions)
            .then(response => response.text())
            .then(async result => {
                await verAmigos();
                await verInvitaciones();
                console.log(result);})
            .catch(error => console.log("error", error));
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

        fetch("http://localhost:8000/amigos/eliminar_invitacion", requestOptions)
            .then(response => response.text())
            .then(async result => {
                await verInvitaciones();
                console.log(result);})
            .catch(error => console.log("error", error));
    };

    const verAmigos = async () => {
        console.log("recibiendo amigos");

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        };

        fetch("http://localhost:8000/amigos", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setAmigo(result);
            })
            .catch(error => console.log("error", error));
    };

    const verInvitaciones = async () => {
        console.log("recibiendo invitaciones");
        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        };

        fetch("http://localhost:8000/amigos/invitaciones", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setInvitacion(result);
            })
            .catch(error => console.log("error", error));
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

        fetch("http://localhost:8000/amigos/enviar_invitacion", requestOptions)
            .then(response => response.text())
            .then(async result => {
                await verAmigos();
                await verInvitaciones();
                console.log(result);
            })
            .catch(error => console.log("error", error));
    };


    useEffect(()=>{
        verAmigos();
        verInvitaciones();
    },[]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [usuarioAInvitar,setUsuarioAInvitar] = useState("");
    const [amigo, setAmigo] = useState([]);
    const [invitacion, setInvitacion] = useState([]);

    return (
        <>
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
                                        pr="4.5rem"
                                        ref={initialRef}
                                        fontSize="xl"
                                        placeholder="Username del usuario a invitar"
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
                        {invitacion.map((i) => (
                            <CartaInvitacion
                                nombre={i.username}
                                nivel={Math.trunc((i.puntos)/100)}
                                aceptarSolicitud={handleAceptarSolicitud}
                                rechazarSolicitud={handleRechazarSolicitud}
                            />
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Center paddingY="20px" paddingX="10%">
                <VStack
                    py={5}
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="center"
                    borderRadius="10px"
                    border="1px"
                    borderColor="gray.300"
                    width={680}
                    boxShadow="0 0 2rem gray"
                >
                    {amigo.map((a) => (
                        <CartaSocial
                            conectado={a.conectado}
                            nombre={a.username}
                            nivel={Math.trunc((a.puntos)/100)}
                        />
                    ))}
                    {amigo.length===0 ? 
                        <Text py={10} fontSize={"2xl"}>Aun no tienes amigos</Text>
                        : ""}
                </VStack>
            </Center>
        </>
    );
}
