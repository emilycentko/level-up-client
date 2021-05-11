import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
import "./Game.css" 

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <button className="btn btn-2 icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
                >Register New Game</button>
            <h1>Games</h1>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            
                        <button className="btn btn-3"
                            onClick={() => {history.push(`/games/${game.id}/edit`)}}
                            >Edit Game</button>

                            <h3 className="game__title">{game.name}</h3>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level: {game.difficulty}</div>
                        </section>
                    })
                }
            </article>
        </>
    )
}