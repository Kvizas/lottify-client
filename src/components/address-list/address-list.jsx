import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getData } from '../../requests/get-data'
import { API_URL } from '../../settings'

import Loader from '../loader/loader'
import AddressCard from '../address-card/address-card'
import DbError from "../db-error/db-error";
import AddressNew from '../address-new/address-new'

export default function AddressList({ onSelect, editable, onAdding }) {

    const { isLoading, error, data, refetch } = useQuery('addresses', () =>
        getData(API_URL + "/users/me")
    )

    const [selected, setSelected] = useState()
    const [addingNew, setAddingNew] = useState()

    const select = (address, i) => {
        setSelected(i);
        onSelect(address);
    }

    const addNew = () => {
        setAddingNew(true);
        if (onAdding) onAdding(true);
    }

    if (isLoading) return <Loader></Loader>
    if (error) return <DbError></DbError>

    return (
        <div className="w-100 d-flex f-wrap">
            {addingNew ?
                <AddressNew
                    onCancel={() => {
                        setAddingNew(false);
                        if (onAdding) onAdding(false);
                    }}
                    onSuccess={() => {
                        refetch();
                        if (onAdding) onAdding(false);
                        setAddingNew(false);
                    }}
                />
                :
                <>
                    {data.Address.map((address, i) =>
                        <AddressCard
                            refetch={refetch}
                            editable={editable}
                            data={address}
                            onSelect={onSelect ? address => select(address, i) : undefined}
                            selected={selected === i}
                        />
                    )}
                    <AddressCard onSelect={addNew} />
                </>
            }
        </div>
    )
}
