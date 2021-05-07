import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"


export const EventForm = () => {
    
    const { games, getGames } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    const history = useHistory()

    const [currentEvent, setEvent] = useState({
        name: "",
        gameId: 0,
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventTitleState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.name = event.target.value
        setEvent(newEventState)
    }

    const changeEventGameState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.gameId = event.target.value
        setEvent(newEventState)
    }

    const changeEventDateState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.date = event.target.value
        setEvent(newEventState)
    }

    const changeEventTimeState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.time = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventTitleState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventGameState}>
                        <option value="0">Select a game</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                {game.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventDateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    
                    evt.preventDefault()

                    const event = {
                        
                        name: currentEvent.name,
                        gameId: parseInt(currentEvent.gameId),
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}