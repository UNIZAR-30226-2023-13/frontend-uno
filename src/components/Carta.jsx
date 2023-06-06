import {
    Box, Image, VStack, Text, Icon,
} from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { HiArrowPath } from "react-icons/hi2";
import { GiCardPlay, GiCardDraw } from "react-icons/gi";
import { MdOutlineColorLens } from "react-icons/md";

import imagen_uno from "../images/Uno-logo.png";
import imagen_uno_minimalista from "../images/UNO_2020.png";
import imagen_1_hp from "../images/Harry-Potter-PNG-Background.png";


export function Carta({
    onClick, numero, color, accion, numCartas, estilo, tipo = "", posible
}) {
    let textoAux;
    let textoCentral;
    const colores = {
        "azul": "blue.500",
        "verde": "green.500",
        "rojo": "red.500",
        "amarillo": "yellow.500"
    };
    var colorFondo = colores[color];
    if (accion) {
        switch (accion) {
        case "uno":
            colorFondo = "black";
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
            colorFondo = "black";
            textoAux = "+4";
            textoCentral = <Icon as={GiCardDraw} />;
            break;
        case "prohibido":
            textoAux = <Icon as={NotAllowedIcon} />;
            textoCentral = <Icon as={NotAllowedIcon} />;
            break;
        case "cambio sentido":
            textoAux = <Icon as={HiArrowPath} />;
            textoCentral = <Icon as={HiArrowPath} />;
            break;
        case "roba 2":
            textoAux = "+2";
            textoCentral = <Icon as={GiCardPlay} />;
            break;
        case "cambio color":
            colorFondo = "black";
            textoAux = <Icon as={MdOutlineColorLens} />;
            textoCentral = <Icon as={MdOutlineColorLens} />;
            break;
        case "mazo":
            colorFondo = "black";
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
    } 
    else{
        textoAux = numero;
        textoCentral = numero;
    }
    
    return (
        (posible === true) ? 
            <Box    
                _hover={{
                    zIndex: 20,
                    transform: "translateY(-20%)",
                    filter: "brightness(110%)",
                    opacity: "99%"
                }}
                transform= "translateY(-10%)"
                filter= "brightness(105%)"
                zIndex="10"
                onClick={onClick}
                bgColor={colorFondo}
                border="1px"
                borderRadius="4px"
                minH="100%"
                align-items="center"
                justify-items="center"
                position="relative"
                left="0px"
                width="105px"
                height= "150px"
                
                
                background-color= "white"
                border-radius= "8px"
                transition= "0.3s ease-in-out"
                box-shadow= "rgba(0, 0, 0, 0.25) 0px 5px 25px"
            >
                <VStack gap={"3"} maxH="100%" alignContent={"space-between"} height={"auto"} width="100%" alignItems="unset">
                    <Text height={"auto"} px="5px" color="white" align="left">
                        {textoAux}
                    </Text>
                    <Text height={"auto"} fontSize="4xl" color="white" align="center">
                        {textoCentral}
                    </Text>
                    <Text height={"auto"} px="5px" color="white" align="right">
                        {textoAux}
                    </Text>
                </VStack>
            </Box>
            :
            (accion==="uno" || tipo==="descarte" || accion==="mazo") ? 
                <Box    
                    onClick={onClick}
                    bgColor={colorFondo}
                    border="1px"
                    borderRadius="4px"
                    minH="100%"
                    align-items="center"
                    justify-items="center"
                    zIndex="10"
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
                :
                <Box    
                    _hover={posible ?  {
                        zIndex: 20,
                        transform: "translateY(-20%)",
                        filter: "brightness(110%)",
                        opacity: "99%"
                    }: {}}
                    zIndex="10"
                    onClick={onClick}
                    bgColor={colorFondo}
                    border="1px"
                    borderRadius="4px"
                    minH="100%"
                    align-items="center"
                    justify-items="center"
                    position="relative"
                    left="0px"
                    width="105px"
                    height= "150px"
                    filter= "brightness(55%)"
                    
                    background-color= "white"
                    border-radius= "8px"
                    transition= "0.3s ease-in-out"
                    box-shadow= "rgba(0, 0, 0, 0.25) 0px 5px 25px"
                >
                    <VStack gap={"3"} maxH="100%" alignContent={"space-between"} height={"auto"} width="100%" alignItems="unset">
                        <Text height={"auto"} px="5px" color="white" align="left">
                            {textoAux}
                        </Text>
                        <Text height={"auto"} fontSize="4xl" color="white" align="center">
                            {textoCentral}
                        </Text>
                        <Text height={"auto"} px="5px" color="white" align="right">
                            {textoAux}
                        </Text>
                    </VStack>
                </Box>
    );
}
