import React, { useContext, useState } from 'react'
import AddressCard from '../address-card/address-card'
import AddressNew from '../address-new/address-new'
import { UserContext } from '../../contexts/user-context-provider'
import { UserUpdateContext } from "../../contexts/user-update-context-provider";

export default function AddressList({ onSelect, editable, onAdding }) {

    const { user } = useContext(UserContext)
    const forceUpdate = useContext(UserUpdateContext)

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

    return (
        <div className="w-100 d-flex f-wrap">
            {addingNew ?
                <AddressNew
                    onCancel={() => {
                        setAddingNew(false);
                        if (onAdding) onAdding(false);
                    }}
                    onSuccess={() => {
                        forceUpdate();
                        if (onAdding) onAdding(false);
                        setAddingNew(false);
                    }}
                />
                :
                <>
                    {user.Address.map((address, i) =>
                        <AddressCard
                            refetch={forceUpdate}
                            editable={editable}
                            data={address}
                            onSelect={onSelect ? address => select(address, i) : undefined}
                            selected={selected === i}
                            key={i}
                        />
                    )}
                    <AddressCard onSelect={addNew} />
                </>
            }
        </div>
    )
}
