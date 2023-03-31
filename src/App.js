

import './App.css';
import { Login } from './components/Login';
import { Img } from './components/Img';
import { Registro } from './components/Registro';
import { Amigos } from './components/Amigos';

function App() {
  return (
    <div className="App">
      {/*
        <div className='column1'>
          <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/640px-UNO_Logo.svg.png"></Img>
        </div>
        <div className='column2Registro'>
          <div className='dentroRegistro'>
            <Registro></Registro>
          </div>
        </div>
      */}
      <Amigos></Amigos>
    </div>
  );
}

export default App;
