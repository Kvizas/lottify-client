import React, { useState, useEffect } from 'react'

import { getData } from "../../requests/get-data";
import { API_URL } from "../../settings";

import "./competitions.scss";

import CompetitionBox from "../../components/competition-box/competition-box";
import Loader from "../../components/loader/loader";
import ReactPaginate from 'react-paginate';
import DBError from '../../components/db-error/db-error';


const compsPerPage = 11;

export default function Competitions(props) {


    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const limit = props.limit;


    const sortByDeadline = (comps) => {
        return comps.sort((comp1, comp2) => new Date(comp2.Deadline.Deadline).getTime() - new Date(comp1.Deadline.Deadline).getTime())
    }


    useEffect(() => {
        getData(API_URL + "/competitions/count").then(d => setMaxPages(d / compsPerPage))
    }, [])

    useEffect(() => {
        getData(API_URL + "/competitions" + (limit !== undefined ? `?_limit=${limit}` : `?_start=${currentPage * compsPerPage}&_limit=${compsPerPage}`))
            .then(d => { 
                setData(sortByDeadline(d));
                setLoading(false); 
        })
            .catch(() => { setError(true); setLoading(false); });
    }, [currentPage, limit])

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    }

    return (
        <div className="section">
            <div className="section-text-box">
                <h1>Current Competitions</h1>
                <p>
                    One of those prizes could be yours!
                </p>
            </div>
            {
                loading ?
                    <Loader></Loader> :
                    error ?
                        <DBError></DBError> :
                        data.length < 1 || !Array.isArray(data) ?
                            (<div className="w-100 text-center">
                                <h2>Currently there are <u>no competitions</u>.</h2>
                            </div>)
                            :
                            (
                                <div className="comp-grid">
                                    {data.map((comp, i) =>
                                        <CompetitionBox key={comp.id} width={props.firstWide && i === 0 ? "100%" : ""} comp={comp}></CompetitionBox>
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
