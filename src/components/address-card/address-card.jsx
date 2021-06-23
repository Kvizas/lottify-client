import React from 'react'
import postData from '../../requests/post-data';
import { API_URL } from '../../settings';

import "./address-card.scss";

import DeleteSVG from "./trash-can.svg";

export default function AddressCard({ data, onSelect, selected, editable, refetch }) {

    const remove = () => {
        postData(API_URL + "/users/delete-address", {
            id: data.id
        }).then(resp => {
            console.log(resp);
            refetch();
        })
    }

    return (
        <div className={`address-card ${!data ? "address-card-new address-card-slectable" : ""} ${selected ? "address-card-selected" : ""} ${onSelect ? "address-card-slectable" : ""}`} onClick={onSelect ? () => onSelect(data) : () => { }}>
            {
                data ?
                    <div className="d-flex w-100">
                        {
                            editable ?
                                <div className="address-card-del" onClick={remove}>
                                    <img className="address-card-del-icon" src={DeleteSVG} alt=""></img>
                                </div>
                                :
                                <></>
                        }
                        <div className="w-50" >
                            <div className="address-card-data w-100">{data.StreetAddress}</div>
                            <div className="address-card-data w-100">{data.City}, {data.PostCode}</div>
                            <div className="address-card-data w-100">{data.Country}</div>
                            <div className="address-card-data w-100">{data.Phone}</div>
                        </div>
                        <div className="address-card-name w-50">{data.FirstName} {data.LastName}</div>
                    </div >
                    :
                    <>
                        <div className="address-card-add">New</div>
                        <p>Add a new billing address.</p>
                    </>
            }
        </div >
    )
}
