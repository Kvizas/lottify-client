import React, { useCallback, useState } from 'react'

import TextInput from '../../components/text-input/text-input';
import DropdownInput from '../../components/dropdown-input/dropdown-input';
import Entry from "../../components/entry/entry";
import { getData } from "../../requests/get-data";
import { API_URL } from "../../settings";
import Loader from '../../components/loader/loader';
import DBError from '../../components/db-error/db-error';

import SearchSVG from "./search.svg";
import FilterSVG from "./filter.svg";

import "./entries.scss";
import { useQuery } from 'react-query';

export default function Entries({ orders }) {

    const relevantOrders = orders.filter(order => order.Tickets);

    const getTicketKey = (ticket) => {
        return `${ticket.Competition};${ticket.Answer}`
    }

    const groupTickets = useCallback(() => {

        var groupedTickets = {};

        for (let order of relevantOrders) {
            for (let ticket of order.Tickets) {
                const key = getTicketKey(ticket);
                if (key in groupedTickets) groupedTickets[key].push(ticket);
                else groupedTickets[key] = [ticket];
            }
        }

        return Object.values(groupedTickets);
    }, [relevantOrders])

    const [entries, setEntries] = useState(groupTickets())

    const { isLoading, error, data } = useQuery('cart-comps',
        () => getData(API_URL + '/competitions?id_in=' +
            groupTickets().map(tg => tg[0].Competition).join("&id_in=")
        )
    );

    const getTicketGroupComp = tg => {
        return data.find(c => c.id === tg[0].Competition);
    }

    const querySearch = value => {
        setEntries(value ?
            groupTickets().filter(tg => getTicketGroupComp(tg).Title.toUpperCase().includes(value.toUpperCase()))
            :
            groupTickets())
    }

    const sort = by => {
        switch (by) {
            case "Alphabetically, A-Z":
                setEntries(tg => [...tg.sort((tg0, tg1) => getTicketGroupComp(tg0).Title.localeCompare(getTicketGroupComp(tg1).Title))])
                break;

            case "Alphabetically, Z-A":
                setEntries(tg => [...tg.sort((tg0, tg1) => getTicketGroupComp(tg1).Title.localeCompare(getTicketGroupComp(tg0).Title))])
                break;

            case "Quantity, few to many":
                setEntries(tg => [...tg.sort((tg0, tg1) => tg0.length > tg1.length ? 1 : -1)])
                break;

            case "Quantity, many to few":
                setEntries(tg => [...tg.sort((tg0, tg1) => tg0.length < tg1.length ? 1 : -1)])
                break;

            case "End date, active to ended":
                setEntries(tg => [...tg.sort((tg0, tg1) => new Date(getTicketGroupComp(tg0).Deadline.Deadline) < new Date(getTicketGroupComp(tg1).Deadline.Deadline) ? 1 : -1)])
                break;

            case "End date, ended to active":
                setEntries(tg => [...tg.sort((tg0, tg1) => new Date(getTicketGroupComp(tg0).Deadline.Deadline) > new Date(getTicketGroupComp(tg1).Deadline.Deadline) ? 1 : -1)])
                break;

            default:
                break;
        }

    }

    return (
        <section style={{ overflow: "hidden" }}>
            <h3 className="w-100 text-center profile-dash-h">Your competition entries</h3>
            {
                relevantOrders.length < 1 ?
                    <p className="text-center">Once you enter a competition your tickets will appear here.<br /> Good luck!</p>
                    :
                    <>
                        {isLoading ?
                            <Loader />
                            :
                            error ?
                                <DBError />
                                :
                                <>
                                    <div className="d-flex f-wrap w-100 justify-space-between">
                                        <TextInput className="entries-inputs" onChange={querySearch} iconStyle={{ width: "24px" }} icon={SearchSVG} placeholder="Search" />
                                        <DropdownInput className="entries-inputs" iconStyle={{ width: "24px" }} icon={FilterSVG} placeholder="Sort by"
                                            options={["Alphabetically, A-Z",
                                                "Alphabetically, Z-A",
                                                "Quantity, few to many",
                                                "Quantity, many to few",
                                                "End date, active to ended",
                                                "End date, ended to active"]}
                                            onSelect={sort} />
                                    </div>
                                    {
                                        entries.map((tg) =>
                                            <Entry
                                                comp={getTicketGroupComp(tg)}
                                                tickets={tg}
                                                key={getTicketKey(tg[0])}
                                            />
                                        )
                                    }
                                </>
                        }
                    </>
            }
        </section>
    )
}
