import {
  Box, Flex, Image, VStack, Text, Container, Icon,
} from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import { HiArrowPath } from 'react-icons/hi2';
import { GiCardPlay } from 'react-icons/gi';

import imagen_uno from '../images/Uno-logo.png';

export function Carta({
  onClick, numero, color, accion, numCartas,
}) {
  let textoAux;
  let textoCentral;
  if (accion) {
    switch (accion) {
      case 'uno':
        textoAux = numCartas;
        textoCentral = <Image src={imagen_uno} />;
        break;
      case 'roba 4':
        textoAux = '+4';
        textoCentral = <Icon fill="aqua" as={GiCardPlay} />;
        break;
      case 'prohibido':
        textoAux = <Icon as={NotAllowedIcon} />;
        textoCentral = <Icon as={NotAllowedIcon} />;
        break;
      case 'reverse':
        textoAux = <Icon as={HiArrowPath} />;
        textoCentral = <Icon as={HiArrowPath} />;
        break;
      case 'roba 2':
        textoAux = '+2';
        textoCentral = <Icon as={GiCardPlay} />;
        break;
      case 'mazo':
        textoAux = '?';
        textoCentral = <Image src={imagen_uno} />;
        break;
      default:
        break;
    }
  } else {
    textoAux = numero;
    textoCentral = numero;
  }
  return (
    <Box
      _hover={{
        transform: 'translateY(-10%)',
        filter: 'brightness(110%)',

      }}
      onClick={onClick}
      bgColor={color}
      border="1px"
      borderRadius="4px"
      minH="100%"
      align-items="center"
      justify-items="center"
    >
      <VStack maxH="100%" width="5em" alignItems="unset">
        <Text px="5px" color="white}" align="left">
          {textoAux}
        </Text>
        <Text fontSize="4xl" color="white}" align="center">
          {textoCentral}
        </Text>
        <Text px="5px" color="white}" align="right">
          {textoAux}
        </Text>
      </VStack>
    </Box>
  );
}
