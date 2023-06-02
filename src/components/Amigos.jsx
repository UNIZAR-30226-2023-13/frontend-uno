import React, { useState } from "react";
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
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [invitaciones, setInvitaciones] = useState([
        {
            nombre: "Pepe Martinez",
            nivel: "12",
        },
        {
            nombre: "Marta Gonzalez",
            nivel: "54",
        },
        {
            nombre: "Lucas Sánchez",
            nivel: "33",
        },
        {
            nombre: "Rosa López",
            nivel: "04",
        },
        {
            nombre: "Jorge Pérez",
            nivel: "48",
        },
    ]);

    const [amigos, setAmigos] = useState([
        {
            nombre: "Pepe Martinez",
            nivel: "12",
            estado: "Conectado",
        },
        {
            nombre: "Marta Gonzalez",
            nivel: "54",
            estado: "Desconectado",
        },
        {
            nombre: "Lucas Sánchez",
            nivel: "33",
            estado: "Desconectado",
        },
        {
            nombre: "Rosa López",
            nivel: "04",
            estado: "Conectado",
        },
        {
            nombre: "Jorge Pérez",
            nivel: "48",
            estado: "Conectado",
        },
    ]);

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
                            <FormLabel fontSize="2xl">
                                Enviar solicitud a un nuevo usuario
                            </FormLabel>
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    ref={initialRef}
                                    fontSize="xl"
                                    placeholder="Username del usuario a invitar"
                                />
                                <InputRightElement px="3rem" width="4.5rem">
                                    <Button
                                        colorScheme="blue"
                                        px="3rem"
                                        rightIcon={<FaPaperPlane />}
                                    >
                                        Enviar
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormLabel fontSize="2xl" pt="1em">
              Invitaciones recibidas
                        </FormLabel>
                        {invitaciones.map((invitacion) => (
                            <CartaInvitacion
                                nombre={invitacion.nombre}
                                nivel={invitacion.nivel}
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
                    {amigos.map((amigo) => (
                        <CartaSocial
                            estado={amigo.estado}
                            nombre={amigo.nombre}
                            nivel={amigo.nivel}
                        />
                    ))}
                </VStack>
            </Center>
        </>
    );
}
