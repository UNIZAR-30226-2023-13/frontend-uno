
import './App.css';
import './App.css';
import { Login } from './components/Login';
import { Img } from './components/Img';
import { Registro } from './components/Registro';
import { Amigos } from './components/Amigos';
import { Personalizar } from './components/Personalizar';
import { useState } from 'react';
import { Inicio } from './components/Inicio';
import { Formato } from './components/Formato';
import { useGlobalState } from './components/GlobalState';

function App() {
  const [ globalState, setGlobalState ] = useGlobalState(
    <Formato></Formato>
  )

  return (
    globalState
  );
}

export default App;