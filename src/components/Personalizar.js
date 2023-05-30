import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  VStack,
} from '@chakra-ui/react';

const IMAGE = 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

function ProductSimple({ objModificar, imagen, accionBoton }) {
  return (
    <Center py={12}>
      <Box
        role="group"
        p={6}
        maxW="330px"
        w="full"
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="lg"
          mt={-12}
          pos="relative"
          height="230px"
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${imagen})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded="lg"
            height={230}
            width={282}
            objectFit="cover"
            src={imagen}
          />
        </Box>
        <Stack pt={10} gap={4} align="center">
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {objModificar}
          </Heading>
          <Button onClick={accionBoton}>
            Personalizar
            {objModificar.toLowerCase()}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default function PersonalizarBonito({ setterPaginaActual }) {
  return (
    <VStack minH="100%" bgColor="gray.100">
      <Text pt="1em" fontSize="4xl">Personalizar</Text>
      <Text pt="1em" fontSize="xl">Aquí podrás cambiar el estilo a tu tablero y a tu baraja</Text>
      <Stack direction={['column', 'row']} gap="5em">
        <ProductSimple objModificar="Tablero" imagen={IMAGE} accionBoton={() => { setterPaginaActual('personalizarTablero'); }} />
        <ProductSimple objModificar="Baraja" imagen={IMAGE} accionBoton={() => { setterPaginaActual('personalizarBaraja'); }} />
      </Stack>
    </VStack>
  );
}
