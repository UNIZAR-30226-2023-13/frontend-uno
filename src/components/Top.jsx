import {
    Badge,
    Box,
    Text,
    HStack,
    Center,
} from "@chakra-ui/react";

export function Top({ nombre, nivel, numCartas }) {
    return (
        <Box
            px="20px"
            py="10px"
            borderRadius="5px"
        >
            <Center>
                <HStack gap={4}>
                    <Text color={"whiteAlpha.900"} bg={"blackAlpha.700"} pl={"10px"} pr={"10px"} py={1} borderRadius={"3px"} fontSize="xl" fontWeight="bold">
                        {nombre}
                    </Text>
                    <Badge  fontSize="md"  colorScheme="blue">
                        Nivel
                        {" "}
                        {nivel}
                    </Badge>
                    <Badge  fontSize="md"  colorScheme="green">
                        {"N.º Cartas: "}
                        {numCartas}
                    </Badge>
                </HStack>
            </Center>
        </Box>
    );
}
