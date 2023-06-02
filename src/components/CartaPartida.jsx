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
    usuario1,
    usuario2,
    usuario3,
    usuario4,
}) {
    const otrosUsuarios = [usuario2, usuario3, usuario4];

    let texto;

    if (ganador === usuario1) {
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
                                    ganador === usuario1 ? "yellow.500" : "black"
                                }
                                mr="2"
                                as={
                                    ganador === usuario1
                                        ? FaCrown
                                        : FaSkullCrossbones
                                }
                            />
                            <Text
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === usuario1 ? "yellow.500" : "black"
                                }
                            >
                                {texto}
                            </Text>
                            <Icon
                                fontSize="4xl"
                                fontWeight="bold"
                                textColor={
                                    ganador === usuario1 ? "yellow.500" : "black"
                                }
                                ml="2"
                                as={
                                    ganador === usuario1
                                        ? FaCrown
                                        : FaSkullCrossbones
                                }
                            />
                        </HStack>
                        <VStack>
                            <Text fontSize="lg">Fecha</Text>
                            <Text fontSize="xl" fontWeight="bold">
                                {fecha}
                            </Text>
                        </VStack>
                    </VStack>
                </Center>
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
                                        ganador === u
                                            ? "yellow"
                                            : colores[index + 2]
                                    }
                                >
                                    {ganador === u ? (
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
                                    {u}
                                    {ganador === u ? (
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
            </Stack>
                
        </Box>
    );
}
