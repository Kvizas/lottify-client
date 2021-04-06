import React from 'react'

import "./HeaderSlides.scss";

import Button from "./button/Button";

export default function HeaderSlides() {
    return (
        <div className="slider-main">
            <div className="slider-container">
                <h1 className="white slider-h">Competition for BMW x6!</h1>
                <p className="white slider-p">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nam nisi perferendis adipisci eum cum accusamus, repellat
                    architecto repellendus minus repudiandae magnam cupiditate
                    labore ea. Ab quo illo autem laborum expedita!
                </p>
                <div className="d-flex justify-space-between w-100">
                    <Button className="slider-left-button">Enter now</Button>
                    <Button className="slider-right-button">Learn more</Button>
                </div>
            </div>
        </div>
    )
}
