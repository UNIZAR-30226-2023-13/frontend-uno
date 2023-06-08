import {
    Badge,
    Box,
    Text,
    Stack,
    Center,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Flex,
    Divider,
    AlertDialogFooter,
    useDisclosure,
} from "@chakra-ui/react";

import { useRef } from "react";

export function CartaSocial({ nombre, conectado, nivel }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    return (
        <>
            <AlertDialog
                isCentered
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirmar eliminar amigo
                        </AlertDialogHeader>
                        <Divider></Divider>
                        <AlertDialogBody>
                            {"¿Deseas eliminar a "} {nombre} {"como amigo?"}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Flex align="center">
                                <Button onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    align="center"
                                    colorScheme="red"
                                    ml={3}
                                    //SE GESTIONARÁ MÁS ADELANTE
                                    onClick={onClose}
                                >
                                    Confirmar
                                </Button>
                            </Flex>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box
                px="20px"
                py="10px"
                borderRadius="5px"
                _hover={{
                    bgColor: "gray.100",
                }}
            >
                <Center>
                    <Stack direction={{ base: "column", md: "row" }} alignItems={"center"} maxW={"90vw"} gap={{ base: "1em", md: "4em" }}>
                        <Text fontSize={{ base: "3xl", md: "2xl" }} fontWeight="bold">
                            {nombre}
                        </Text>
                        <Center>
                            <Badge fontSize={{ base: "lg", md: "md" }} colorScheme={(conectado===true) ? "green" : "red"}>
                                {(conectado===true) ? "Conectado" : "Desconectado"}   
                            </Badge>
                        </Center>
                        <Center>
                            <Badge fontSize={{ base: "lg", md: "md" }} colorScheme="blue">
                            Nivel
                                {" "}
                                {nivel}
                            </Badge>
                        </Center>
                        <Button fontSize={{ base: "lg", md: "md" }} onClick={onOpen} colorScheme="red">Eliminar</Button>
                    </Stack>
                </Center>
            </Box>
        </>
    );
}
