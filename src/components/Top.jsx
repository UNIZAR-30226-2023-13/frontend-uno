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
                    <Text bg={"blackAlpha.300"} pl={"10px"} pr={"10px"} borderRadius={"3px"} fontSize="sm" fontWeight="bold">
                        {nombre}
                    </Text>
                    <Badge colorScheme="blue">
                        Nivel
                        {" "}
                        {nivel}
                    </Badge>
                    <Badge colorScheme="green">
                        {"N.º Cartas: "}
                        {numCartas}
                    </Badge>
                </HStack>
            </Center>
        </Box>
    );
}
