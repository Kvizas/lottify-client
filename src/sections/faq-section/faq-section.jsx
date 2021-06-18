import React, { useState, useEffect } from 'react'

import FAQBox from '../../components/faq-box/faq-box';
import Loader from "../../components/loader/loader";
import DbError from "../../components/db-error/db-error";

import { getData } from "../../requests/get-data";
import { API_URL } from "../../settings";

import "./faq-section.scss";

export default function FAQSection() {

    const [categories, setCategories] = useState({})
    const [activeCategory, setActiveCategory] = useState(undefined)

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        getData(API_URL + "/faqs").then(res => {
            res.forEach(question => {
                if (question.faq_category === null) return;
                const categoryTitle = question.faq_category.Category;
                setCategories(prev => {
                    if (categoryTitle in prev) prev[categoryTitle].push(question);
                    else prev[categoryTitle] = [question];
                    return prev;
                });
            })
            console.log(categories);
            setData(res);
            setIsLoading(false);
        }).catch(() => {
            setError(true);
            setIsLoading(false);
        })
    }, [categories])

    const renderFaq = e => {
        return <FAQBox title={e.Question} key={e.id}>{e.Answer}</FAQBox>
    }

    return (
        <div className="section">
            <h2 className="faq-header w-100 mobile-text-center">Frequently asked questions</h2>
            <p className="w-100 mobile-text-center">Find the answers to the most common questions we face from the customers by using our platform.</p>
            {isLoading ? <Loader></Loader> :
                error ? <DbError></DbError> :
                    <div className="d-flex w-100">
                        <div className="faq-container">
                            {activeCategory == null ?
                                data.map(e => renderFaq(e))
                                :
                                categories[activeCategory].map(e => renderFaq(e))
                            }
                        </div>
                        <div className="faq-categories">
                            <h2>Categories</h2>
                            <ul>
                                <li className={activeCategory == null ? "faq-active-cat" : ""} key="all" onClick={() => setActiveCategory(undefined)}>All ({data.length})</li>
                                {Object.keys(categories).map(title =>
                                    <li key={title} className={activeCategory === title ? "faq-active-cat" : ""} onClick={() => setActiveCategory(title)}>{title} ({categories[title].length})</li>
                                )}
                            </ul>
                        </div>
                    </div>
            }
        </div>
    )
}
