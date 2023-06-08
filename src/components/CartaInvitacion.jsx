import {
    Badge,
    Box,
    Text,
    Stack,
    Center,
    Button,
    Flex,
    Spacer
} from "@chakra-ui/react";



export function CartaInvitacion({ nombre, nivel, aceptarSolicitud, rechazarSolicitud }) {
    return (
        <Box px="20px" py="10px" borderRadius="5px">
            <Center>
                <Stack direction={{ base: "column", md: "row" }} maxW={"90vw"} gap={{ base: "1em", md: "4em" }}>
                    <Flex direction="row">
                        <Text width="150px" fontSize={{ base: "3xl", md: "2xl" }} fontWeight="bold">
                            {nombre}
                        </Text>
                        <Spacer/>
                        <Center>
                            <Badge fontSize={{ base: "lg", md: "md" }} colorScheme="blue">
                        Nivel
                                {" " + nivel}
                            </Badge>
                        </Center>
                    </Flex>
                    <Flex gap={4} direction="row">
                        <Button fontSize={{ base: "lg", md: "md" }} onClick={() => {aceptarSolicitud(nombre);}} colorScheme="green">Aceptar</Button>
                        <Spacer/>
                        <Button fontSize={{ base: "lg", md: "md" }} onClick={() => {rechazarSolicitud(nombre);}} colorScheme="red">Rechazar</Button>
                    </Flex>
                </Stack>
            </Center>
        </Box>
    );
}
