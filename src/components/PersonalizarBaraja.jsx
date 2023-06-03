import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Image,
    HStack,
    Stack,
    Text,
    Button,
    Center,
} from "@chakra-ui/react";



export function PersonalizarBaraja() {

    const [baraja,setBaraja] = useState([]);

    const verEstiloCarta = async () => {

        var requestOptions = {
            method: "GET",
            redirect: "follow",
            credentials: "include"
        };

        fetch("http://localhost:8000/aspectos/cartas", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setBaraja(result);
            })
            .catch(error => console.log("error", error));
    };

    const handleCambiarAspectoCarta = async() => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("aspecto", baraja[currentSlide].nombre);

        var requestOptions = {
            method: "POST",
            body: urlencoded,
            redirect: "follow",
            credentials: "include"
        };

        fetch("http://localhost:8000/aspectos/cartas/cambiar", requestOptions)
            .then(response => response.text())
            .then(async result => {
                await verEstiloCarta();
                console.log(result);
            })
            .catch(error => console.log("error", error));
    };

    useEffect(()=>{
        verEstiloCarta();
    },[]);

    const arrowStyles = {
        cursor: "pointer",
        pos: "absolute",
        top: "50%",
        w: "auto",
        mt: "-22px",
        p: "16px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        _hover: {
            opacity: 0.8,
            bg: "black",
        },
    };
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = baraja.length;

    useEffect(() => {
        console.log(`Current slide${currentSlide}`);
        console.log(`Slide count${slidesCount}`);
    });

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const setSlide = (slide) => {
        setCurrentSlide(slide);
    };

    const carouselStyle = {
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
    };
    return (
        <Flex
            w="full"
            bg="#edf3f8"
            _dark={{
                bg: "#3e3e3e",
            }}
            p={10}
            alignItems="center"
            justifyContent="center"
        >
            <Flex w="full" pos="relative" overflow="hidden">
                <Flex h="630px" w="full" {...carouselStyle}>
                    {baraja.map((estilo, sid) => (
                        <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
                            <Text
                                color="white"
                                fontSize="xs"
                                p="8px 12px"
                                pos="absolute"
                                top="0"
                            >
                                {sid + 1}
                                {" "}
                                    /
                                {slidesCount}
                            </Text>
                            <Image
                                aspectRatio={"1/1"}
                                objectFit={"cover"}
                                src={estilo.ruta}
                                alt="carousel image"
                                boxSize="full"
                                backgroundSize="cover"
                            />
                            <Center>
                                <Stack
                                    p="20px 20px"
                                    pos="absolute"
                                    bottom="24px"
                                    textAlign="center"
                                    align="center"
                                    mb="8"
                                    color="white"
                                    bgColor={"whiteAlpha.900"}
                                    borderRadius={"10px"}
                                >
                                    <Text fontSize="2xl" bg={"blackAlpha.800"} borderRadius={"10px"} pl={"10px"} pr={"10px"} pt={"2px"} pb={"2px"}>{estilo.nombre}</Text>
                                    <Text fontSize="2xl" bg={"blue.700"} borderRadius={"10px"} pl={"10px"} pr={"10px"} pt={"2px"} pb={"2px"}>Disponible en el nivel: {Math.trunc((estilo.puntos_desbloqueo) / 100)}</Text>
                                    {!estilo.desbloqueado ? 
                                        (<Button isDisabled="true" colorScheme="red">Todavía no tienes el nivel necesario</Button>) :
                                        (estilo.enUso 
                                            ? (<Button  isDisabled="true" colorScheme="green">Seleccionado</Button>) :
                                            (<Button onClick={handleCambiarAspectoCarta} colorScheme="blackAlpha">Seleccionar</Button>))}
                                </Stack>
                            </Center>
                        </Box>
                    ))}
                </Flex>
                <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
                </Text>
                <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
                </Text>
                <HStack justify="center" pos="absolute" bottom="8px" w="full">
                    {Array.from({
                        length: slidesCount,
                    }).map((_, slide) => (
                        <Box
                            key={`dots-${slide}`}
                            cursor="pointer"
                            boxSize={["7px", null, "15px"]}
                            m="0 2px"
                            bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
                            rounded="50%"
                            display="inline-block"
                            transition="background-color 0.6s ease"
                            _hover={{
                                bg: "blackAlpha.800",
                            }}
                            onClick={() => setSlide(slide)}
                        />
                    ))}
                </HStack>
            </Flex>
        </Flex>
    );
}
