import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    VStack,
} from "@chakra-ui/react";

import imagen_tablero from "../images/4469150.jpg";
import imagen_baraja from "../images/card-games.jpg";

function ProductSimple({ objModificar, imagen, accionBoton }) {
    return (
        <Center py={12}>
            <Box
                role="group"
                p={6}
                maxW="330px"
                w="full"
                bg={useColorModeValue("white", "gray.800")}
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
            >
                <Box
                    px={6}
                    rounded="lg"
                    mt={-12}
                    pos="relative"
                    
                    _after={{
                        transition: "all .3s ease",
                        content: "\"\"",
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${imagen})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: "blur(20px)",
                        },
                    }}
                >
                    <Image
                        rounded="lg"
                        
                        
                        objectFit="fill"
                        
                        boxShadow="0 0 2rem gray"
                        src={imagen}
                    />
                </Box>
                <Stack pt={10} gap={4} align="center">
                    <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
                        {objModificar}
                    </Heading>
                    <Button onClick={accionBoton}>
                        Personalizar {objModificar.toLowerCase()}
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}

export default function Personalizar({ setterPaginaActual }) {
    return (
        <VStack minH="100%">
            <Text pt="1em" fontSize="4xl">Personalizar</Text>
            <Text pt="1em" fontSize="xl">Aquí podrás cambiar el estilo a tu tablero y a tu baraja</Text>
            <Stack direction={{ base: "column", md: "row" }} gap={{ base: "0px", md: "5em" }} >
                <ProductSimple objModificar="Tablero" imagen={imagen_tablero} accionBoton={() => { setterPaginaActual("personalizarTablero"); }} />
                <ProductSimple objModificar="Baraja" imagen={imagen_baraja} accionBoton={() => { setterPaginaActual("personalizarBaraja"); }} />
            </Stack>
        </VStack>
    );
}
