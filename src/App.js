import logo from './logo.svg';
import TextField from '@mui/material/TextField';

import './App.css';
import { Login } from './components/Login';

function App() {
  return (
    <div className="App">
        <div className="auth-form-container">
          <Login></Login>
        </div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
    </div>
  );
}

export default App;
