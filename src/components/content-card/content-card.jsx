import React from 'react'

import "./content-card.scss";

export default function ContentCard({ children, hidden }) {
    return (
        <div className={`content-card ${hidden ? "content-card-hidden" : ""}`} >
            {children}
        </ div>
    )
}
