import React, { useState, useContext } from 'react'

import ContentCard from '../../components/content-card/content-card'
import Button from '../../components/button/button'
import { UserContext } from '../../contexts/user-context-provider'
import AddressList from '../../components/address-list/address-list'
import AccountDetails from '../../components/account-details/account-details'

import "./profile.scss"
import Entries from '../entries/entries'

export default function Profile() {

    const { user } = useContext(UserContext)

    const [nav, setNav] = useState("Dashboard")

    return (
        <section className="section">
            <h2 className="mobile-section-h profile-h-margin">My account</h2>
            <ContentCard>
                <div className="w-100 d-flex" style={{ paddingBottom: "24px" }}>
                    <div className="w-50 profile-nav">
                        <Button className="profile-nav-btn" black={nav !== "Dashboard"} onClick={() => setNav("Dashboard")}>Dashboard</Button>
                    </div>
                    <div className="w-50 profile-nav">
                        <Button className="profile-nav-btn" black={nav !== "Account"} onClick={() => setNav("Account")}>Account details</Button>
                    </div>
                </div>

                {
                    nav === "Dashboard" ?
                        <>
                            <h3 className="profile-dash-h" style={{ paddingTop: "12px" }}>Hello, {user.username}</h3>
                            <p>This is your account dashboard! Here you will be able to track your ticket purchases, edit account information and add your billing address.</p>
                            <Entries orders={user.Orders}></Entries>
                        </>
                        :
                        nav === "Account" ?
                            <>
                                <AccountDetails />
                                <AddressList editable={true} />
                            </>
                            :
                            <> </>
                }

            </ContentCard>
        </section >
    )
}
