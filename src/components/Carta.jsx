import {
    Box, Image, VStack, Text, Icon,
} from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { HiArrowPath } from "react-icons/hi2";
import { GiCardPlay } from "react-icons/gi";

import imagen_uno from "../images/Uno-logo.png";
import imagen_uno_minimalista from "../images/UNO_2020.png";
import imagen_1_hp from "../images/Harry-Potter-PNG-Background.png";


export function Carta({
    onClick, numero, color, accion, numCartas, estilo,seleccionable=false
}) {
    let textoAux;
    let textoCentral;
    if (accion) {
        console.log("soy especial");
        switch (accion) {
        case "uno":
            textoAux = numCartas;
            switch(estilo) {
            case "clasico":
                textoCentral = <Image src={imagen_uno} />;
                break;
            case "minimalista":
                textoCentral = <Image src={imagen_uno_minimalista} />;
                break;
            }
            break;
        case "roba 4":
            textoAux = "+4";
            textoCentral = <Icon fill="aqua" as={GiCardPlay} />;
            break;
        case "prohibido":
            textoAux = <Icon as={NotAllowedIcon} />;
            textoCentral = <Icon as={NotAllowedIcon} />;
            break;
        case "reverse":
            textoAux = <Icon as={HiArrowPath} />;
            textoCentral = <Icon as={HiArrowPath} />;
            break;
        case "roba 2":
            textoAux = "+2";
            textoCentral = <Icon as={GiCardPlay} />;
            break;
        case "mazo":
            textoAux = "?";
            switch(estilo) {
            case "clasico":
                textoCentral = <Image src={imagen_uno} />;
                break;
            case "minimalista":
                textoCentral = <Image src={imagen_uno_minimalista} />;
                break;
            }
            break;
        default:
            break;
        }
    } else if (estilo==="harry potter")  {
        console.log("soy harry potter");
        switch(numero){
        case 1:
            switch(estilo){
            case "harry potter":
                textoAux = numero;
                textoCentral = <Image src={imagen_1_hp} />;
            }
        }
    }
    else{
        console.log("soy normal");
        textoAux = numero;
        textoCentral = numero;
    }
    return (
        <Box    
            _hover={{
                transform: "translateY(-10%)",
                filter: "brightness(110%)",

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
