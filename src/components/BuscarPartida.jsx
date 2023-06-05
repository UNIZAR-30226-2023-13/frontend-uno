import {
    Box,
    Text,
    HStack,
    Center,
    Spinner,
    VStack,
    Image,
} from "@chakra-ui/react";


export function BuscarPartida() {
    return (
        <>
            <Box px="20px" py="10px" borderRadius="5px">
                <Center>
                    <VStack>
                        <HStack gap={4}>
                            <Text pt="1em" fontSize="4xl">Buscando partida...</Text>
                        </HStack>
                        <HStack>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </HStack>
                    </VStack>
                </Center>
            </Box>
        </>
    );
}
