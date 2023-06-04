import {
    Badge,
    Box,
    Text,
    HStack,
    Icon,
    Center,
    VStack,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { FaCrown, FaSkullCrossbones } from "react-icons/fa";

export function CartaPartida({
    ganador,
    fecha,
    usuarioPropio,
    otrosUsuarios
}) {
    const fechaDate = new Date (fecha);
    const agno = fechaDate.getFullYear();
    const mes = fechaDate.getMonth() + 1;
    const dia = fechaDate.getUTCDate() + 1;
    //const otrosUsuarios = [usuario2, usuario3, usuario4];

    let texto;

    if (usuarioPropio.esGanador) {
        texto = "¡Victoria!";
    } else {
        texto = "Derrota";
    }

    return (
        <Box
            ml="3"
            px="20px"
            py="10px"
            borderRadius="5px"
            _hover={{
                bgColor: "gray.100",
            }}
            maxW={"90vw"}
        >
            <Stack direction={{ base: "column", md: "row" }} maxW={"90vw"} gap={{ base: "1em", md: "4em" }} divider={<StackDivider borderColor='gray.200' />}>
                <Center>
                    <VStack maxWidth={"15em"} gap={4}>
                        <HStack justifyContent={"center"} w={"15em"}>
                            <Icon
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === usuarioPropio.nombre ? "yellow.500" : "black"
                                }
                                mr="2"
                                as={
                                    ganador === usuarioPropio.nombre
                                        ? FaCrown
                                        : FaSkullCrossbones
                                }
                            />
                            <Text
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === usuarioPropio.nombre ? "yellow.500" : "black"
                                }
                            >
                                {texto}
                            </Text>
                            <Icon
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === usuarioPropio.nombre ? "yellow.500" : "black"
                                }
                                ml="2"
                                as={
                                    ganador === usuarioPropio.nombre
                                        ? FaCrown
                                        : FaSkullCrossbones
                                }
                            />
                        </HStack>
                        <VStack>
                            <Text fontSize="lg">Fecha</Text>
                            <Text fontSize="xl" fontWeight="bold">
                                {dia + "-" + mes + "-" + agno}
                            </Text>
                        </VStack>
                    </VStack>
                </Center>
                {/* */}
                
                            
                <Center>
                    <VStack maxWidth={"10em"}>
                        <Text align={"center"} w={"10em"} fontSize="2xl">Jugadores</Text>
                        {otrosUsuarios.map((u, index) => {
                            const colores = {
                                2: "red",
                                3: "blue",
                                4: "green",
                            };
                            return (
                                <Badge
                                    key={index}
                                    textTransform="none"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    colorScheme={
                                        ganador === u.nombre
                                            ? "yellow"
                                            : colores[index + 2]
                                    }
                                >
                                    {ganador === u.nombre ? (
                                        <Icon
                                            mr="0.5em"
                                            fontSize="2xl"
                                            fontWeight="bold"
                                            textColor="yellow.500"
                                            as={FaCrown}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    {u.nombre}
                                    {ganador === u.nombre ? (
                                        <Icon
                                            ml="0.5em"
                                            fontSize="2xl"
                                            fontWeight="bold"
                                            textColor="yellow.500"
                                            as={FaCrown}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </Badge>
                            );
                        })}
                    </VStack>
                </Center>
                {/* */}
            </Stack>
                
        </Box>
    );
}
