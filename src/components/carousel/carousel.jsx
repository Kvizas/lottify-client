import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from "react-dom";

import "./carousel.scss";

export default function Carousel(props) {

    const imagesRef = useRef([]);

    const [classNameArray, setClassNameArray] = useState([])

    const images = props.children.map(e => e.props.src)

    function arrayRotate(arr, reverse) {
        if (reverse) arr.unshift(arr.pop());
        else arr.push(arr.shift());
        return arr;
    }

    useEffect(() => {
        setClassNameArray(imagesRef.current.map(e => e.className));
    }, [imagesRef])

    const nextSlide = () => {
        arrayRotate(classNameArray, true);
        imagesRef.current.forEach((div, i) => div.className = classNameArray[i]);
    }

    const prevSlide = () => {
        arrayRotate(classNameArray);
        imagesRef.current.forEach((div, i) => div.className = classNameArray[i]);
    }

    const getImage = index => {
        const cursorStart = imagesRef.current;
        console.log(cursorStart);
        const arrayIndex = (index + cursorStart) % images.length;
        console.log(`${index} + ${cursorStart} % ${images.length} = ${arrayIndex}`);
        return images[arrayIndex];
    };

    return (
        <div className="carousel-base">
            <div className="carousel-images">
                <div className="carousel-0 carousel-transition carousel-far-prev-img carousel-sides"
                    ref={ref => imagesRef.current[0] = ref}
                    style={{ backgroundImage: `url(${getImage(0)})` }}></div>
                <div className="carousel-1 carousel-transition carousel-prev-img carousel-sides"
                    ref={ref => imagesRef.current[1] = ref}
                    style={{ backgroundImage: `url(${getImage(1)})` }}></div>
                <div className="carousel-2 carousel-transition carousel-curr-img"
                    ref={ref => imagesRef.current[2] = ref}
                    style={{ backgroundImage: `url(${getImage(2)})` }}></div>
                <div className="carousel-3 carousel-transition carousel-next-img carousel-sides"
                    ref={ref => imagesRef.current[3] = ref}
                    style={{ backgroundImage: `url(${getImage(3)})` }}></div>
                <div className="carousel-4 carousel-transition carousel-far-next-img carousel-sides"
                    ref={ref => imagesRef.current[4] = ref}
                    style={{ backgroundImage: `url(${getImage(4)})` }}></div>
            </div>
            <button onClick={prevSlide}>Prev</button>
            <button onClick={nextSlide}>Next</button>
        </div>
    )
}
