import { Img } from "./Img"
import { Inicio } from "./Inicio"
import { Login } from "./Login"



export const Formato = () => {
    return (
        <div className="App">
            
            <div className='column1'>
            <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/640px-UNO_Logo.svg.png"></Img>
            </div>
            <div className='column2Login'>
            <div className='dentroRegistro'>
                <Login/>
            </div>
            </div>
        </div>
    )
}