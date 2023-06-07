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
    fecha,
    usuarioPropio,
    otrosUsuarios
}) {
    console.log();
    const fechaDate = new Date (fecha);
    const agno = fechaDate.getFullYear();
    const mes = fechaDate.getMonth() + 1;
    const dia = fechaDate.getUTCDate() + 1;

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
                                    usuarioPropio.esGanador ? "yellow.500" : "black"
                                }
                                mr="2"
                                as={
                                    usuarioPropio.esGanador
                                        ? FaCrown
                                        : FaSkullCrossbones
                                }
                            />
                            <Text
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    usuarioPropio.esGanador ? "yellow.500" : "black"
                                }
                            >
                                {texto}
                            </Text>
                            <Icon
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    usuarioPropio.esGanador ? "yellow.500" : "black"
                                }
                                ml="2"
                                as={
                                    usuarioPropio.esGanador
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
                                        u.esGanador
                                            ? "yellow"
                                            : colores[index + 2]
                                    }
                                >
                                    {u.esGanador ? (
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
                                    {u.esGanador ? (
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

                        {otrosUsuarios.length===0 ? 
                            <Badge align={"center"} colorScheme="purple">Abandono de jugadores</Badge>
                            : ""}
                    </VStack>
                </Center>
            </Stack>
                
        </Box>
    );
}
