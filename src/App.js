import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';

function App() {
  return (
    <div className="App">
        <div className="auth-form-container">
          <Login></Login>
        </div>
    </div>
  );
}

export default App;
