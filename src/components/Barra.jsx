import {
    Flex,
    Box,
    HStack,
    Button,
    useColorModeValue,
    IconButton,
    VStack,
    CloseButton,
    Link,
    chakra,
    useDisclosure,
} from "@chakra-ui/react";
import {
    HiUser, HiUserGroup, HiShoppingCart, HiClipboard,
} from "react-icons/hi";
import {
    AiOutlineMenu,
} from "react-icons/ai";
import React from "react";
import Login from "./Login";
import { useGlobalState } from "./GlobalState";
import { socket } from "../socket";


export function Barra({ setterPaginaActual, paginaActual }) {
    const [, setGlobalState] = useGlobalState();

    const handleCerrarSesion = () => {
        var requestOptions = {
            method: "POST",
            redirect: "follow",
            credentials: "include"
        };

        fetch(process.env.REACT_APP_BACKEND_HOST + "/cuenta/cerrar-sesion", requestOptions)
            .then(response => {
                if(response.status === 200){
                    socket.disconnect();
                    setGlobalState(<Login/>);
                }
                else{
                    //No se ha podido cerrar sesion
                }
                return response.text();
            })  
            .then(result => console.log(result))
            .catch(error => console.log("error", error));

        
    };

    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    return (
        <chakra.header
            bg={bg}
            w="full"
            px={{
                base: 2,
                sm: 4,
            }}
            py={4}
            shadow="md"
            borderBottomWidth={"2px"}
            borderBottomColor={"gray.300"}
        >
            <Flex alignItems="center" justifyContent="space-between" mx="auto">

                <Link
                    _hover={{
                        bgGradient: "linear(to-l, red.500, yellow.400, green.500,  blue.500)",

                    }}
                    bgGradient={(paginaActual === "inicio") ? "linear(to-l, red.500, yellow.400, green.500,  blue.500)" : null}
                    bgColor={(paginaActual === "inicio") ? null : "black"}
                    bgClip="text"
                    fontSize="5xl"
                    fontWeight="extrabold"
                    onClick={() => { setterPaginaActual("inicio"); }}
                    ml="2"
                >
          UNO!
                </Link>
                <HStack display="flex" alignItems="center" spacing={1}>
                    <HStack
                        spacing={1}
                        mr={1}

                        color="brand.500"
                        display={{
                            base: "none",
                            md: "inline-flex",
                        }}
                    >
                        <Button
                            fontSize="xl"
                            _hover={{
                                bgColor: "blue.500",
                                color: "white",
                            }}
                            onClick={() => { setterPaginaActual("personalizar"); }}
                            leftIcon={<HiShoppingCart />}
                            colorScheme={paginaActual === "personalizar" ? "blue" : null}
                            variant={paginaActual === "personalizar" ? null : "ghost"}
                        >
              Personalizar
                        </Button>
                        <Button
                            fontSize="xl"
                            _hover={{
                                bgColor: "yellow.500",
                                color: "white",
                            }}
                            onClick={() => { setterPaginaActual("amigos"); }}
                            leftIcon={<HiUserGroup />}
                            color={paginaActual === "amigos" ? "white" : "black"}
                            bgColor={paginaActual === "amigos" ? "yellow.500" : null}
                            variant={paginaActual === "amigos" ? null : "ghost"}
                        >
              Amigos
                        </Button>
                        <Button
                            fontSize="xl"
                            _hover={{
                                bgColor: "green.500",
                                color: "white",
                            }}
                            onClick={() => { setterPaginaActual("historial"); }}
                            leftIcon={<HiClipboard />}
                            colorScheme={paginaActual === "historial" ? "green" : null}
                            variant={paginaActual === "historial" ? null : "ghost"}
                        >
              Historial de partidas
                        </Button>
                        <Button
                            fontSize="xl"
                            _hover={{
                                bgColor: "red.500",
                                color: "white",
                            }}
                            onClick={() => { setterPaginaActual("perfil"); }}
                            leftIcon={<HiUser />}
                            colorScheme={paginaActual === "perfil" ? "red" : null}
                            variant={paginaActual === "perfil" ? null : "ghost"}
                        >
              Perfil
                        </Button>
                    </HStack>
                    <Button

                        fontSize="xl"
                        color="whiteAlpha.900"
                        bgColor="blackAlpha.900"
                        _hover={{
                            bgColor: "blackAlpha.700",
                        }}
                        onClick={handleCerrarSesion}
                    >
            Cerrar sesión
                    </Button>
                    <Box
                        display={{
                            base: "inline-flex",
                            md: "none",
                        }}
                    >
                        <IconButton
                            display={{
                                base: "flex",
                                md: "none",
                            }}
                            aria-label="Open menu"
                            fontSize="20px"
                            color="gray.800"
                            _dark={{
                                color: "inherit",
                            }}
                            variant="ghost"
                            icon={<AiOutlineMenu />}
                            onClick={mobileNav.onOpen}
                        />

                        <VStack
                            pos="absolute"
                            top={0}
                            left={0}
                            right={0}
                            display={mobileNav.isOpen ? "flex" : "none"}
                            flexDirection="column"
                            p={2}
                            pb={4}
                            m={2}
                            bg={bg}
                            spacing={3}
                            rounded="sm"
                            shadow="sm"
                        >
                            <CloseButton
                                aria-label="Close menu"
                                onClick={mobileNav.onClose}
                            />

                            <Button
                                w="full"
                                variant="ghost"
                                colorScheme={paginaActual === "personalizar" ? "blue" : null}
                                onClick={() => {
                                    setterPaginaActual("personalizar");
                                    mobileNav.onClose();
                                }}
                            >
                Personalizar
                            </Button>
                            <Button
                                w="full"
                                variant="solid"
                                colorScheme={paginaActual === "amigos" ? "yellow" : null}
                                onClick={() => {
                                    setterPaginaActual("amigos");
                                    mobileNav.onClose();
                                }}
                            >
                Amigos
                            </Button>
                            <Button
                                w="full"
                                variant="solid"
                                colorScheme={paginaActual === "historial" ? "green" : null}
                                onClick={() => {
                                    setterPaginaActual("historial");
                                    mobileNav.onClose();
                                }}
                            >
                Historial de partidas
                            </Button>
                            <Button
                                w="full"
                                variant="solid"
                                colorScheme={paginaActual === "perfil" ? "red" : null}
                                onClick={() => {
                                    setterPaginaActual("perfil");
                                    mobileNav.onClose();
                                }}
                            >
                Perfil
                            </Button>
                        </VStack>
                    </Box>
                </HStack>
            </Flex>
        </chakra.header>
    );
}
