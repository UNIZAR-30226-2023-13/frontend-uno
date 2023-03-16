import logo from './logo.svg';
import TextField from '@mui/material/TextField';

import './App.css';
import { Login } from './components/Login';
import { Img } from './components/Img';

function App() {
  return (
    <div className="App">
        <div className='column1'>
          <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/640px-UNO_Logo.svg.png"></Img>
        </div>
        
        <div className='auth-form-container'>
          <Login></Login>
        </div>
    </div>
  );
}

export default App;
