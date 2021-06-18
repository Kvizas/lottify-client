import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useHistory } from "react-router-dom";

import "./HeaderSlides.scss";

import { API_URL } from "../../settings";
import { getData } from "../../requests/get-data";

import Button from "./button/Button";

class Slide {

    constructor(header, paragraph, img, compid) {
        this.h = header;
        this.p = paragraph;
        this.img = img;
        this.compid = compid;
    }
}

export default function HeaderSlides() {

    const [slides, setSlides] = useState([]);

    useQuery('slidesData', () =>
        getData(API_URL + `/frontpage-slides`).then(json => {
            setSlides([]);
            json.forEach(slide => {
                let s = new Slide(slide.Title, slide.Description, API_URL + slide.Slide.url, slide.Competition ? slide.Competition.id : undefined);
                setSlides(prev => [...prev, s]);
            });
            return json;
        })
    );

    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {

        const nextSlide = function () {
            setActiveSlide(prev => (prev + 1) % slides.length);
        }

        const interval = setInterval(nextSlide, 9000);
        return () => clearInterval(interval);
    }, [slides])

    const history = useHistory();

    const goToComp = id => {
        history.push("/competition/" + id);
    }

    if (slides.length < 1) return "";

    return (
        <div className="slider-main" style={{ backgroundImage: `url(${slides[activeSlide].img})` }}>
            <div className="slider-container">
                <h1 className="white slider-h">{slides[activeSlide].h}</h1>
                <p className="white slider-p">
                    {slides[activeSlide].p}
                </p>
                <div className="d-flex justify-center w-100">
                    {slides[activeSlide].compid ? <Button onClick={() => goToComp(slides[activeSlide].compid)}>Enter now</Button> : ""}
                </div>
            </div>
            <div className="slider-all-dots">
                {slides.map((_, i) =>
                    <div key={i} className={`slider-dot ${activeSlide === i ? "slider-dot-active" : ""}`} onClick={() => setActiveSlide(i)}></div>
                )}
            </div>
        </div>
    )
}
