import React from 'react'

import "./recent-winners.scss";

import Image1 from "./1.png";
import Image2 from "./2.jpg";
import Image3 from "./3.webp";
import Image4 from "./4.png";
import Image5 from "./5.png";
import Carousel from '../../components/carousel/carousel';

export default function RecentWinners() {
    return (
        <div className="rw-main section">
            <h1>Recent winners</h1>
            <Carousel>
                <img src={Image1}></img>
                <img src={Image2}></img>
                <img src={Image3}></img>
                <img src={Image4}></img>
                <img src={Image5}></img>
            </Carousel>
        </div>
    )
}
