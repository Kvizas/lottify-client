import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getData } from '../../requests/get-data'
import { API_URL } from '../../settings'

import Loader from '../loader/loader'
import AddressCard from '../address-card/address-card'
import DbError from "../db-error/db-error";
import AddressNew from '../address-new/address-new'

export default function AddressList({ onSelect, editable }) {

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
    }

    if (isLoading) return <Loader></Loader>
    if (error) return <DbError></DbError>

    console.log(data);

    return (
        <div className="w-100 d-flex f-wrap">
            {addingNew ?
                <AddressNew
                    onCancel={() => setAddingNew(false)}
                    onSuccess={() => {
                        refetch();
                        setAddingNew(false);
                    }}
                />
                :
                <>
                    {console.log(data)}
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
