import {
  Badge,
  Box,
  Flex,
  Text,
  HStack,
  Center,
} from '@chakra-ui/react';

export function CartaSocial({ nombre, estado, nivel }) {
  return (
    <Box
      px="20px"
      py="10px"
      borderRadius="5px"
      _hover={{
        bgColor: 'gray.100',
      }}
    >
      <Center>
        <HStack gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {nombre}
          </Text>
          <Badge colorScheme={(estado === 'Conectado') ? 'green' : 'red'}>
            {estado}
          </Badge>
          <Badge colorScheme="blue">
            Nivel
            {' '}
            {nivel}
          </Badge>
        </HStack>
      </Center>
    </Box>
  );
}
