import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  VStack,
} from '@chakra-ui/react';

export function Perfil({ nombre_usuario }) {
  return (
    <>
      <VStack>
        <Text pt="1em" fontSize="4xl">Perfil</Text>
        <Text pt="1em" fontSize="xl">Aquí podrás configurar tu correo electrónico y contraseña</Text>
      </VStack>
      <Flex
        minH="100%"
        align="center"
        justify="center"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg={useColorModeValue('white', 'gray.700')}
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Configuración de perfil
          </Heading>
          <FormControl id="userName" />
          <FormControl id="userName">
            <FormLabel>Nombre de usuario</FormLabel>
            <Input
              disabled="true"
              placeholder={nombre_usuario}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              placeholder="Nuevo correo electrónico"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input
              placeholder="Nueva contraseña"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg="red.400"
              color="white"
              w="full"
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancelar
            </Button>
            <Button
              bg="blue.400"
              color="white"
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Guardar cambios
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
