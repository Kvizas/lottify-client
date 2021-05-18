import React, { useState, useEffect } from 'react'

import { getData } from "../../requests/get-data";
import { API_URL } from "../../settings";

import "./competitions.scss";

import CompetitionBox from "../../components/competition-box/competition-box";
import Loader from "../../components/loader/loader";
import ReactPaginate from 'react-paginate';


const compsPerPage = 11;

export default function Competitions(props) {


    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [data, setData] = useState([]);

    const limit = props.limit;

    useEffect(() => {
        getData(API_URL + "/competitions/count").then(d => setMaxPages(d / compsPerPage))
    }, [])

    useEffect(() => {
        getData(API_URL + "/competitions" + (limit !== undefined ? `?_limit=${limit}` : `?_start=${currentPage * compsPerPage}&_limit=${compsPerPage}`)).then(d => setData(d));
    }, [currentPage])

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    }

    return (
        <div className="section">
            <div className="section-text-box">
                <h1>Current Competitions</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscingin elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur.
                </p>
            </div>
            {
                !data ?
                    <Loader></Loader> :
                    (
                        <div className="comp-grid">
                            {data.map((comp, i) =>
                                <CompetitionBox width={props.firstWide && i === 0 ? "100%" : ""} title={comp.Title} price={comp.Price} value={comp.Value} img={API_URL + comp.Images[0].url}></CompetitionBox>
                            )}
                        </div>
                    )

            }
            {
                limit ?
                    < a href="/competitions" className="see-more">See more</a>
                    : maxPages > 1 ? <ReactPaginate
                        pageCount={maxPages}
                        onPageChange={handlePageChange}
                        nextLabel={"❯"}
                        previousLabel={"❮"}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    ></ReactPaginate> : ""
            }
        </div >
    )
}
