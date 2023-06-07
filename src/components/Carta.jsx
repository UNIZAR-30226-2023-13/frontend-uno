import {
    Box, Image, Text, Icon, Center, Flex, Spacer
} from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { HiArrowPath } from "react-icons/hi2";
import { GiCardPlay, GiCardDraw } from "react-icons/gi";
import { MdOutlineColorLens } from "react-icons/md";

import imagen_uno from "../images/Uno-logo.png";
import imagen_uno_minimalista from "../images/UNO_2020.png";
import imagen_uno_mario from "../images/5f569b8b4322de00046d577b.png";
import imagen_carta_mario from "../images/d8bfa319e67b51d35ad73aeb39fce320.png";
import imagen_carta_luigi from "../images/Luigi-png.webp";
import imagen_carta_peach from "../images/SuperMarioParty_Peach_2.webp";
import imagen_carta_bowser from "../images/bowser-png-Transparent.png";
import imagen_uno_pokemon from "../images/Poké_Ball_icon.svg.png";
import imagen_carta_pikachu from "../images/580b57fcd9996e24bc43c325.png";
import imagen_carta_charmander from "../images/Pokemon-Charmander-PNG-Pic.png";
import imagen_carta_bulbasaur from "../images/Bulbasaur.webp";
import imagen_carta_squirtle from "../images/580b57fcd9996e24bc43c32a.png";
import imagen_uno_spiderman from "../images/spider_man_ps4_logo_by_crillyboy25_dc0f846-fullview.png";
import imagen_carta_spiderman from "../images/85b0e22abfef18c932f206ede0b275b9.png";
import imagen_carta_miles from "../images/104496-spider-man-miles-morales-png-free-photo.png";
import imagen_carta_gwen from "../images/50fc29b58585060abe3bad9a03e2c9d6.png";
import imagen_carta_venom from "../images/e084554d769c5ad5cb2eabf66fcdf65c.png";

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
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno} />;
                break;
            case "minimalista":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_minimalista} />;
                break;
            case "mario":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_mario} />;
                break;
            case "pokemon":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_pokemon} />;
                break;
            case "spiderman":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_spiderman} />;
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
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno} />;
                break;
            case "minimalista":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_minimalista} />;
                break;
            case "mario":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_mario} />;
                break;
            case "pokemon":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_pokemon} />;
                break;
            case "spiderman":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_uno_spiderman} />;
                break;
            }
            break;
        default:
            break;
        }
    } 
    else{
        textoAux = numero;
        switch(estilo) {
        case "clasico":
            textoCentral = numero;
            break;
        case "minimalista":
            textoCentral = numero;
            break;
        case "mario":
            switch(color){
            case "rojo":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_mario} />;
                break;
            case "verde":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_luigi} />;
                break;
            case "azul":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_peach} />;
                break;
            case "amarillo":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_bowser} />;
                break;
            }
            break;
        case "pokemon":
            switch(color){
            case "rojo":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_charmander} />;
                break;
            case "verde":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_bulbasaur} />;
                break;
            case "azul":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_squirtle} />;
                break;
            case "amarillo":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_pikachu} />;
                break;
            }
            break;
        case "spiderman":
            switch(color){
            case "rojo":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_spiderman} />;
                break;
            case "verde":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_miles} />;
                break;
            case "azul":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_gwen} />;
                break;
            case "amarillo":
                textoCentral = <Image objectFit={"scale-down"} aspectRatio={"1/1"} w={"100%"} h={"100%"} src={imagen_carta_venom} />;
                break;
            }
            break;
        }
    }
    
    const aparienciaCarta = () => {
        if(posible === true){
            return (
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
                    <Flex flexDirection={"column"}  maxH="100%"  height={"100%"} width="100%" alignItems="unset">
                        <Text height={"auto"} px="5px" color="white" align="left">
                            {textoAux}
                        </Text>
                        <Spacer/>
                        {((accion) 
                            ? 
                            <Text fontSize="4xl" color="white" align="center">
                                {textoCentral}
                            </Text>
                            :
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {cartaConEstiloCentral()}
                            </Text>)}
                        <Spacer/>
                        <Text height={"auto"} px="5px" color="white" align="right">
                            {textoAux}
                        </Text>
                    </Flex>
                </Box>
            );
        }
        else if(tipo === "descarte"){
            return (
                <Box    
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
                    <Flex flexDirection={"column"}  maxH="100%"  height={"100%"} width="100%" alignItems="unset">
                        <Text height={"auto"} px="5px" color="white" align="left">
                            {textoAux}
                        </Text>
                        <Spacer/>
                        {((accion) 
                            ? 
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {textoCentral}
                            </Text>
                            :
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {cartaConEstiloCentral()}
                            </Text>)}
                        <Spacer/>
                        <Text height={"auto"} px="5px" color="white" align="right">
                            {textoAux}
                        </Text>
                    </Flex>
                </Box>
            );
        }
        else if(accion === "mazo" || accion === "uno"){
            return (
                <Box    
                    onClick={onClick}
                    bgColor={colorFondo}
                    border="1px"
                    borderRadius="4px"
                    minH="100%"
                    align-items="center"
                    justify-items="center"
                    zIndex="10"
                    width="105px"
                    height= "150px"
                    position="relative"
                    left="0px"
                >
                    <Flex flexDirection={"column"}  maxH="100%"  height={"100%"} width="100%" alignItems="unset">
                        <Text px="5px" color="white}" align="left">
                            {textoAux}
                        </Text>
                        <Spacer/>
                        {((tipo === "descarte") 
                            ? 
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {cartaConEstiloCentral()}
                            </Text>
                            :
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {cartaConEstiloCentral()}
                            </Text>)}
                        <Spacer/>
                        <Text  px="5px" color="white" align="right">
                            {textoAux}
                        </Text> 
                    </Flex>
                </Box>
            );
        }
        else{
            return (
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
                    <Flex flexDirection={"column"}  maxH="100%"  height={"100%"} width="100%" alignItems="unset">
                        <Text height={"auto"} px="5px" color="white" align="left">
                            {textoAux}
                        </Text>
                        <Spacer/>
                        {((accion === true) 
                            ? 
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {textoCentral}
                            </Text>
                            :
                            <Text height={"auto"} fontSize="4xl" color="white" align="center">
                                {cartaConEstiloCentral()}
                            </Text>)}
                        <Spacer/>
                        <Text height={"auto"} px="5px" color="white" align="right">
                            {textoAux}
                        </Text>
                    </Flex>
                </Box>
            );
        }
    };

    const cartaConEstiloCentral = () => {
        if(estilo === "clasico"){
            if(accion){
                if(accion != "mazo" || accion != "uno"){
                    return (
                        <Text height={"auto"} fontSize="4xl" dropShadow={"2px 3px black"} color="white" align="center">
                            {textoCentral}
                        </Text>
                    );
                }
                else{
                    return (
                        <Text height={"auto"} fontSize="4xl" textShadow="2px 3px black" color="white" align="center">
                            {textoCentral}
                        </Text>
                    );
                }
            }
            else{
                return (
                    <Text height={"auto"} fontSize="4xl" textShadow="2px 3px black" color="white" align="center">
                        {textoCentral}
                    </Text>
                );
            }
        }
        else if(estilo === "minimalista"){
            if(accion === "uno" || accion === "mazo"){
                return (
                    <Text height={"auto"} px={2.5} align="center">
                        {textoCentral}
                    </Text>
                );
            }
            else{
                return (
                    <Text height={"auto"} fontSize="4xl" color="white" align="center">
                        {textoCentral}
                    </Text>
                );
            }
        }
        else{
            return(      
                <Center>
                    {textoCentral}
                </Center>
            );
        }
    };

    return (
        aparienciaCarta()
    );
}
