import {
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AiOutlineMenu,
} from 'react-icons/ai';
import React, { useState } from 'react';
import Login from './Login';
import { useGlobalState } from './GlobalState';
import { Barra } from './Barra';
import Personalizar from './Personalizar';
import { PersonalizarTablero } from './PersonalizarTablero';
import Juego from './Juego';
import { PersonalizarBaraja } from './PersonalizarBaraja';
import { Amigos } from './Amigos';
import { Perfil } from './Perfil';
import { Historial } from './Historial';
import { EmpezarPartida } from './EmpezarPartida';

export function Inicio() {
  const [paginaActual, setPaginaActual] = useState('inicio');
  const [globalState, setGlobalState] = useGlobalState();
  switch (paginaActual) {
    case 'inicio':
      return (
        <>
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <EmpezarPartida puntos={893} />
        </>
      );
    case 'personalizar':
      return (
        <div minHeight="100%">
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <Personalizar setterPaginaActual={setPaginaActual} />
        </div>
      );
    case 'personalizarTablero':
      return (
        <>
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <PersonalizarTablero />
        </>
      );
    case 'personalizarBaraja':
      return (
        <>
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <PersonalizarBaraja />
        </>
      );
    case 'amigos':
      return (
        <>
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <Amigos />
        </>
      );
    case 'perfil':
      return (
        <>
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <Perfil nombre_usuario="pepe" />
        </>
      );
    case 'historial':
      return (
        <>
          <Barra setterPaginaActual={setPaginaActual} paginaActual={paginaActual} />
          <Historial />
        </>
      );

    default:
      break;
  }
}