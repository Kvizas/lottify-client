import React from 'react'

import "./HeaderSlides.scss";

import { getData } from "../../requests/get-data";

import Button from "./button/Button";

let slides = [];

class Slide {

    constructor(header, paragraph, img) {
        this.h = header;
        this.p = paragraph;
        this.img = img;
        slides.push(this);
    }
}

export default function HeaderSlides() {

    let currentSlide = new Slide("Competition for BMW x6!",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dicta animi itaque commodi ab. Maiores, eum esse saepe iusto, minima vitae quidem aspernatur nemo et, exercitationem adipisci voluptatibus impedit voluptas.",
        "bmw.webp");

    const nextSlide = function () {

    }

    setInterval(nextSlide, 7000);

    return (
        <div className="slider-main" style={{ backgroundImage: currentSlide.img }}>
            <div className="slider-container">
                <h1 className="white slider-h">{currentSlide.h}</h1>
                <p className="white slider-p">
                    {currentSlide.p}
                </p>
                <div className="d-flex justify-space-between w-100">
                    <Button className="slider-left-button">Enter now</Button>
                    <Button className="slider-right-button">Learn more</Button>
                </div>
            </div>
            <div className="slider-all-dots">
                <div className="slider-dot slider-dot-active"></div>
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>
                <div className="slider-dot"></div>
            </div>
        </div>
    )
}
