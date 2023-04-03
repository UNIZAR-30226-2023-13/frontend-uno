import React from "react";
import { Button } from "./Button";
import { Img } from "./Img";

export const ComponenteSlider = () => {
    return (
        <div className="sliderCP">
            <div class='sliderC'>
                <Img src="https://images.unsplash.com/photo-1525382455947-f319bc05fb35?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                <div className="botonSlider">
                    <Button>Seleccionar</Button>
                </div>
            </div>
        </div>
    )
}