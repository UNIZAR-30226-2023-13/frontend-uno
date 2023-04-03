import React from "react";
import { Button } from "./Button";
import { ComponenteSlider } from "./ComponenteSlider";
import { StyledTextField } from "./StyledTextField";

export const SliderTablero = () => {
    return (
        <div className="sliderP">
            <div class='slider'>
                <ComponenteSlider></ComponenteSlider>
                <ComponenteSlider></ComponenteSlider>
            </div>
        </div>
    )
}