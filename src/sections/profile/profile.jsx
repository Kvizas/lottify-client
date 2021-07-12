import React, { useState, useContext } from 'react'

import ContentCard from '../../components/content-card/content-card'
import Button from '../../components/button/button'
import { UserContext } from '../../contexts/user-context-provider'
import AddressList from '../../components/address-list/address-list'
import AccountDetails from '../../components/account-details/account-details'

import "./profile.scss"

export default function Profile() {

    const { user } = useContext(UserContext)

    const [nav, setNav] = useState("Dashboard")

    return (
        <section className="section">
            <h2 className="mobile-section-h profile-h-margin">My account</h2>
            <ContentCard hidden={nav !== "Dashboard"}>
                <div className="w-100 d-flex" style={{ paddingBottom: "24px" }}>
                    <div className="w-3rd profile-nav profile-floating-nav">
                        <Button className="profile-nav-btn" black={nav !== "Dashboard"} onClick={() => setNav("Dashboard")}>Dashboard</Button>
                    </div>
                    <div className="w-3rd profile-nav">
                        <Button className="profile-nav-btn" black={nav !== "Account"} onClick={() => setNav("Account")}>Account details</Button>
                    </div>
                    <div className="w-3rd profile-nav profile-floating-nav">
                        <Button className="profile-nav-btn" black={nav !== "Addresses"} onClick={() => setNav("Addresses")}>Addresses</Button>
                    </div>
                </div>

                {
                    nav === "Dashboard" ?
                        <>
                            <h3 className="profile-dash-h" style={{ paddingTop: "12px" }}>Hello, {user.username}</h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                                sed diam nonumy eirmod tempor invidunt ut labore et dolore
                                magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                                no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        </>
                        :
                        nav === "Account" ?
                            <AccountDetails />
                            :
                            nav === "Addresses" ?
                                <AddressList editable={true} />
                                :
                                <> </>
                }

            </ContentCard>
        </section >
    )
}
