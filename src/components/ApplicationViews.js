import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
            
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>

                <Route exact path="/events/new">
                    <EventForm />
                </Route>
                <Route path="/games/:gameId(\d+)/edit">
                    <GameForm />
                </Route>
                </EventProvider>
            </GameProvider>
        </main>
    </>
}