import React, { useState, useRef, useContext } from 'react'
import { useQuery } from 'react-query';

import { getData } from "../../requests/get-data";

import { CartContext } from '../../contexts/cart-context-provider';

import "./competition.scss";

import PriceTag from '../../components/price-tag/price-tag';
import { API_URL } from '../../settings';
import Loader from '../../components/loader/loader';
import DBError from '../../components/db-error/db-error';
import moment from 'moment';
import ProgressBar from '../../components/progress-bar/progress-bar';
import Checkbox from '../../components/checkbox/checkbox';
import Button from '../../components/button/button';
import FAQBox from "../../components/faq-box/faq-box";
import Thumbnail from "../../components/thumbnail/thumbnail";
import NumberSpinner from '../../components/number-spinner/number-spinner';
import { fixPrice } from '../../utilities/prices';
import ImageViewer from '../../components/image-viewer/image-viewer';
import { CartPopupContext } from '../../contexts/cart-popup-context-provider';

export default function Competition(props) {

    const compid = props.id;

    const [answer, setAnswer] = useState(undefined);
    const [submitted, setSubmitted] = useState(false);
    const [tickets, setTickets] = useState(1);

    const { cart, setCart } = useContext(CartContext)
    const { setCartPopupActive, setLatestProduct } = useContext(CartPopupContext);

    const iw = useRef({});
    const m_iw = useRef({});

    const { isLoading, error, data } = useQuery('comp', () =>
        Promise.all([
            getData(API_URL + '/competitions/' + compid),
            getData(API_URL + '/competition-faq')
        ])
    );

    const addToCart = () => {
        const existing = cart.products.find(prod => prod.compId === compid && prod.answer === answer);
        var index = -1;
        if (existing) {
            const products = [...cart.products];
            index = products.indexOf(existing);
            products[index].quantity += tickets;
            setCart({ products: products });
        } else {
            index = cart.products.length;
            setCart({
                products: [...cart.products, {
                    compId: compid,
                    quantity: tickets,
                    answer: answer,
                    compData: data[0]
                }]
            })
        }
        console.log("AAAAA", index);
        setLatestProduct(index);
        setCartPopupActive(true);
    }


    if (isLoading) return <section className="section justify-left"><Loader></Loader></section>
    if (error) return <section className="section justify-left"><DBError></DBError></section>

    const compData = data[0];
    const faqData = data[1];

    const canAddToCart = () => {
        const sum = (a, b) => a + b;
        return cart.products.filter(prod => prod.compId === compid).map(prod => prod.quantity).reduce(sum, 0) + tickets > compData.AvailableTickets;
    }

    return (
        <section className="section justify-left comp-overlow-hidden">
            <h2 className="comp-header">{compData.Title}</h2>
            <p className="comp-subheader">{
                "Live draw " + moment(compData.Deadline.Deadline).format("dddd Do of MMM  h:mm A")
            }</p>
            <div className="comp-card">
                <PriceTag price={compData.Price}></PriceTag>
                <div className="comp-img" onClick={() => m_iw.current.view(0)} style={{ backgroundImage: `url(${API_URL + compData.Images[0].url}` }}></div>
                <div className="comp-m-gallery">
                    <ImageViewer myRef={m_iw}>
                        {compData.Images.map((img, i) =>
                            <Thumbnail
                                key={i}
                                url={img.url}
                                onClick={() => m_iw.current.view(i)}
                                firstHidden={i === 0}
                                lastWide={compData.Images.length % 2 === 0 && i === compData.Images.length - 1}
                            ></Thumbnail>)}
                    </ImageViewer>
                </div>
                <div className="comp-card-content">
                    <ProgressBar
                        left={compData.AvailableTickets}
                        total={compData.TotalTickets}
                        progress={(compData.AvailableTickets / compData.TotalTickets) * 100}
                    ></ProgressBar>
                    <br />

                    <div className="d-flex">
                        <div className="w-75 comp-question">

                            {
                                new Date(compData.Deadline.Deadline) < new Date() ?
                                    <h3 className="text-center">This competition has already ended.</h3> :
                                    !submitted ? <div className="comp-m-center">
                                        <h3 className="comp-header">Answer the question:</h3>
                                        <p className="comp-subheader comp-question-p">Please answer the skilled question to have a chance to win this prize</p>
                                        <h3 className="comp-header">{compData.Question}</h3>
                                        {compData.Answers.map(a => <Checkbox key={a.id} checked={answer === a.id} onChange={() => setAnswer(a.id)}>{a.Answer}</Checkbox>)}
                                        <Button className="comp-m-button" onClick={() => setSubmitted(true)} disabled={answer === undefined}>Submit answer</Button>
                                    </div> :
                                        <div className="d-flex f-wrap">
                                            <div className="w-75 comp-m-buy">
                                                <h3 className="comp-header">Buy tickets</h3>
                                                <p className="comp-subheader comp-purchase-p">Price of one ticket: <span style={{ color: "#E05955" }}>£{compData.Price}</span></p>
                                                <p className="comp-subheader comp-purchase-p d-flex align-center">Select how many you want: <NumberSpinner
                                                    max={compData.AvailableTickets}
                                                    min={1}
                                                    default={1}
                                                    change={c => setTickets(c)}
                                                ></NumberSpinner></p>
                                            </div>
                                            <div className="w-25 d-flex f-wrap align-end justify-end comp-m-buy comp-m-to-cart">
                                                <h4 className="comp-total">Total: <span style={{ color: "#E05955" }}>£{fixPrice(tickets * compData.Price)}</span></h4>
                                                <Button onClick={addToCart} disabled={canAddToCart()} short={true}>Add to cart</Button>
                                            </div>
                                        </div>}
                            <br />
                            <FAQBox title="Prize details">{compData.Details}</FAQBox>
                            {faqData.faqs.map((faq, i) => <FAQBox key={i} title={faq.Question}>{faq.Answer}</FAQBox>)}
                        </div>
                        <div className="w-25 comp-desktop-gallery">
                            <ImageViewer myRef={iw}>
                                {compData.Images.map((img, i) => <Thumbnail key={i} url={img.url} onClick={() => iw.current.view(i)}></Thumbnail>)}
                            </ImageViewer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
