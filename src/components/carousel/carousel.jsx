import React, { useState, useRef, useEffect } from 'react'

import "./carousel.scss";

import { API_URL } from '../../settings';

import { ReactComponent as SwitchSVG } from '../../assets/misq/switch.svg';

const SLIDE_TIME = 1000;

export default function Carousel({ slides, callNextSlideRef }) {

    const slidesDivRef = useRef([])
    const [currentSlide, setCurrentSlide] = useState(0)

    const [currentTitle, setCurrentTitle] = useState()
    const [prevTitle, setPrevTitle] = useState()

    const [activeContent, setActiveContent] = useState(0)
    const [currentContent, setCurrentContent] = useState()
    const [prevContent, setPrevContent] = useState()

    const [buttonCooldown, setButtonCooldown] = useState()

    function arrayRotate(arr, reverse) {
        if (reverse) arr.unshift(arr.pop());
        else arr.push(arr.shift());
        return arr;
    }

    const modOfLength = index => {
        return index - slides.length * Math.floor(index / slides.length);
    }

    const nextSlide = (forward) => {

        const now = new Date();
        if (now <= new Date(buttonCooldown)) return;
        else setButtonCooldown(now.getTime() + SLIDE_TIME)

        setCurrentSlide(prev => forward ? prev + 1 : prev - 1);

        setPrevTitle(currentTitle);
        setCurrentTitle(slides[modOfLength(currentSlide + (forward ? 1 : -1))].title);
        setPrevContent(currentContent);
        setCurrentContent(slides[modOfLength(currentSlide + (forward ? 1 : -1))].content);
        setActiveContent(prev => !prev);

        // Updates last image to be the next one
        slidesDivRef.current.find(div => div.className.includes(forward ? 'carousel-far-prev-img' : 'carousel-far-next-img')).style.backgroundImage = `url(${API_URL + slides[modOfLength(currentSlide + (forward ? 3 : -3))].img})`;

        var classes = slidesDivRef.current.map(div => div.className)
        classes = arrayRotate(classes, forward)
        for (let i = 0; i < slidesDivRef.current.length; i++) {
            slidesDivRef.current[i].className = classes[i];
        }
    }

    callNextSlideRef.current.call = nextSlide;

    useEffect(() => {
        for (let i = 0; i < slidesDivRef.current.length; i++) {
            slidesDivRef.current[i].style.backgroundImage = `url(${API_URL + slides[modOfLength(i - 2)].img})`;
        }
        setCurrentContent(slides[0].content);
        setCurrentTitle(slides[0].title);
        setActiveContent(1);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="carousel-base">
            <div className="carousel-images">
                <div className="carousel-transition carousel-far-prev-img carousel-sides"
                    ref={ref => slidesDivRef.current[0] = ref}><div className="carousel-overlay" /></div>
                <div className="carousel-transition carousel-prev-img carousel-sides"
                    ref={ref => slidesDivRef.current[1] = ref}><div className="carousel-overlay" /></div>
                <div className="carousel-transition carousel-curr-img"
                    ref={ref => slidesDivRef.current[2] = ref}><div className="carousel-overlay" /></div>
                <div className="carousel-transition carousel-next-img carousel-sides"
                    ref={ref => slidesDivRef.current[3] = ref}><div className="carousel-overlay" /></div>
                <div className="carousel-transition carousel-far-next-img carousel-sides"
                    ref={ref => slidesDivRef.current[4] = ref}><div className="carousel-overlay" /></div>
            </div>
            <div className="carousel-title">

                <div className={`carousel-content ${activeContent ? '' : 'carousel-content-hidden'}`}>
                    {activeContent ? currentTitle : prevTitle}
                </div>
                <div className={`carousel-content ${!activeContent ? '' : 'carousel-content-hidden'}`}>
                    {!activeContent ? currentTitle : prevTitle}
                </div>

                <div className="carousel-buttons">
                    <div className="carousel-btn" onClick={() => nextSlide(0)}><SwitchSVG /></div>
                    <div className="carousel-btn carousel-btn-reverse" onClick={() => nextSlide(1)}><SwitchSVG /></div>
                </div>
            </div>
            <div>
                <div className={`carousel-content ${activeContent ? '' : 'carousel-content-hidden'}`}>
                    {activeContent ? currentContent : prevContent}
                </div>
                <div className={`carousel-content ${!activeContent ? '' : 'carousel-content-hidden'}`}>
                    {!activeContent ? currentContent : prevContent}
                </div>
            </div>
        </div>
    )
}
