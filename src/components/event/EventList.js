import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)

    const history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        
        <>
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
                >Schedule New Event</button>
            <article className="events">
                <header className="events__header">
                    <h1>Level Up Game Events</h1>
                </header>
                {
                    events.map(event => {
                        return <section key={event.id} className="registration">
                            <h3 className="registration__game">{event.name}</h3>
                            <div>{event.game.name}</div>
                            <div>
                                {
                                    new Date(event.date).toLocaleDateString("en-US",
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                }
                                : {event.time} pm
                            </div>
                        </section>
                    })
                }
            </article >
        </>
    )
}