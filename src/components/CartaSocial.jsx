import {
    Badge,
    Box,
    Text,
    HStack,
    Center,
} from "@chakra-ui/react";

export function CartaSocial({ nombre, conectado, nivel }) {
    return (
        <Box
            px="20px"
            py="10px"
            borderRadius="5px"
            _hover={{
                bgColor: "gray.100",
            }}
        >
            <Center>
                <HStack gap={4}>
                    <Text fontSize="2xl" fontWeight="bold">
                        {nombre}
                    </Text>
                    <Badge colorScheme={(conectado === "Conectado") ? "green" : "red"}>
                        {conectado}
                    </Badge>
                    <Badge colorScheme="blue">
                        Nivel
                        {" "}
                        {nivel}
                    </Badge>
                </HStack>
            </Center>
        </Box>
    );
}
