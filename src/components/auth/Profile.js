import React, { useEffect, useContext } from "react"
import { ProfileContext } from "./ProfileProvider.js"
import "./Profile.css"


export const Profile = () => {
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h2>Your Info</h2>
                </header>
                <div className="profile__name">
                    Welcome, {profile.gamer && profile.gamer.user.first_name} {profile.gamer && profile.gamer.user.last_name}
                </div>
                <div className="profile__username">Username: {profile.gamer && profile.gamer.user.username}</div>
                <div className="profile__bio">About you: {profile.gamer && profile.gamer.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h2>Your Events</h2>
                </header>
                <div className="registrations">
                    {
                        profile.events.map(event => {
                            return <div key={event.id} className="registration">
                                <h3 className="registration__game">{event.game.name}</h3>
                                <div>{event.name}</div>
                                <div>
                                    {event.date} at {event.time}
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </article>
    )
}