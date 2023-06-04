import {
    Badge,
    Box,
    Text,
    HStack,
    Center,
    Button,
} from "@chakra-ui/react";



export function CartaInvitacion({ nombre, nivel, aceptarSolicitud, rechazarSolicitud }) {
    return (
        <Box px="20px" py="10px" borderRadius="5px">
            <Center>
                <HStack gap={4}>
                    <Text width="150px" fontSize="xl" fontWeight="bold">
                        {nombre}
                    </Text>
                    <Badge colorScheme="blue">
                        Nivel
                        {nivel}
                    </Badge>
                    <Button onClick={() => {aceptarSolicitud(nombre);}} colorScheme="green">Aceptar</Button>
                    <Button onClick={() => {rechazarSolicitud(nombre);}} colorScheme="red">Rechazar</Button>
                </HStack>
            </Center>
        </Box>
    );
}
