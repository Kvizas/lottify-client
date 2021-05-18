import React from 'react'

import "./about-us.scss";

import Img1 from "./aus-1.webp";
import Img2 from "./aus-2.webp";
import Img3 from "./aus-3.webp";

export default function AboutUs() {
    return (
        <div className="section" id="aboutus">
            <div className="about-us-image-row">
                <div className="about-us-image" style={{ backgroundImage: `url(${Img1})` }}></div>
                <div className="about-us-image" style={{ backgroundImage: `url(${Img2})` }}></div>
                <div className="about-us-image about-us-image-disappear" style={{ backgroundImage: `url(${Img3})` }}></div>
            </div>
            <div className="section-text-box">
                <h1>What is Lottify?</h1>
                <p>
                    Lottify knows what you want, we run amazing prize competitions that will change your life.
                    We believe that you shouldn’t pay full retail price to make your dreams come true. Whether
                    you’re after high performance cars, a holiday for you and your family or the latest tech,
                    we are here to make it happen.
                </p>
                <div className="d-flex f-wrap">
                    <div className="about-us-stat">
                        <h2>513</h2>
                        <h3>Completed competitions</h3>
                    </div>
                    <div className="about-us-stat">
                        <h2>321</h2>
                        <h3>Total winners</h3>
                    </div>
                    <div className="about-us-stat">
                        <h2>21</h2>
                        <h3>Winners this month</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
