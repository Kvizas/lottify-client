import marked from 'marked';
import React from 'react'
import { useQuery } from 'react-query'
import DBError from '../../components/db-error/db-error';
import Loader from '../../components/loader/loader';
import { getData } from '../../requests/get-data';

import { API_URL } from "../../settings";

export default function MarkedSection(props) {

    const { isLoading, error, data } = useQuery('terms', () => getData(API_URL + props.link));

    return (
        <div className="section justify-left">
            {
                isLoading ? <Loader></Loader> :
                    error ? <DBError></DBError> :
                        <div className="marked-content" dangerouslySetInnerHTML={{ __html: marked(data[props.markedKey], { baseUrl: API_URL }) }}></div>
            }
        </div >
    )
}
