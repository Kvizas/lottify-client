import React from 'react'
import PageStripe from '../../components/page-stripe/page-stripe';

import "./NotFound.scss";

export default function Homepage() {
    return (
        <div className="not-found-margin">
            <PageStripe>
                Woops.
            </PageStripe>
            <div className="not-found-text">
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>The page you requested could not be found or entered the wrong URL</p>
            </div>
        </div>
    )
}
