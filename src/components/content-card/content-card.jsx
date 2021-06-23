import React from 'react'

import "./content-card.scss";

export default function ContentCard({ children }) {
    return (
        <div className="content-card">
            {children}
        </div>
    )
}
