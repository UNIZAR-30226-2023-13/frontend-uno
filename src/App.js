
import './App.css';
import './App.css';
import { Login } from './components/Login';
import { Img } from './components/Img';
import { Registro } from './components/Registro';
import { Amigos } from './components/Amigos';
import { Personalizar } from './components/Personalizar';

function App() {
  return (
    <div className="App">
        {/*}
        <div className='column1'>
          <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/640px-UNO_Logo.svg.png"></Img>
        </div>
        <div className='column2Login'>
          <div className='dentroRegistro'>
            <Login/>
          </div>
        </div>
      */}
      {// <Personalizar nivel="12"></Personalizar> 
        
      }
      <Amigos></Amigos>
    </div>
  );
}

export default App;
