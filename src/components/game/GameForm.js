import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const { createGame, getGameTypes, gameTypes, editGame, getGameById } = useContext(GameContext)
    
    const history = useHistory()
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [game, setGame] = useState({
        name: "",
        difficulty: 1,
        numberOfPlayers: 0,
        gameTypeId: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    // useEffect(() => {
    //     getGameTypes()
    // }, [])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const handleControlledInputChange = (event) => {
        const newGame = { ...game }
        newGame[event.target.id] = event.target.value
        setGame(newGame)
    }

    const handleSaveGame = () => {
        if (game.name === "" || game.numberOfPlayers === "") {
            window.alert("Please complete all the fields")
          } else {
            setIsLoading(true);
  
        if (gameId){
            
            editGame({
                id: game.id,
                name: game.name,
                numberOfPlayers: game.numberOfPlayers,
                difficulty: game.difficulty,
                gameTypeId: game.gameTypeId,
            })
            .then(() => history.push(`/games`))
          } else {
            
            createGame({
                name: game.name,
                numberOfPlayers: game.numberOfPlayers,
                difficulty: game.difficulty,
                gameTypeId: game.gameTypeId
            })
            .then(() => history.push("/games"))
          }
        }
    }

    useEffect(() => {
        getGameTypes()
        if (gameId) {
          getGameById(gameId)
          .then(game => {
              setGame({
                id: game.id,
                name: game.name,
                numberOfPlayers: game.number_of_players,
                difficulty: game.difficulty,
                gameTypeId: game.game_type.id})
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
      }
  }, [])

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{gameId ? "Edit Game" : "Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game name: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        value={game.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Number of players: </label>
                    <input type="text" id="numberOfPlayers" required className="form-control"
                        value={game.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game type: </label>
                    <select id="gameTypeId" required className="form-control"
                        value={game.gameTypeId}
                        onChange={handleControlledInputChange}>
                        
                        <option value="0">Select a game type</option>
                        {gameTypes.map(gameType => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.type}
                            </option>
                        ))}
                    </select>     
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="difficulty">Skill level: </label>
                    <select id="difficulty" required autoFocus className="form-control"
                        value={game.difficulty}
                        onChange={handleControlledInputChange}>
                        
                        <option value="0">Select skill level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>     
                </div>
            </fieldset>

            <button type="submit"
                disabled={isLoading}
                onClick={evt => {
                        // Prevent form from being submitted
                    evt.preventDefault()
                    handleSaveGame()
                    }}>
                    {gameId ? "Save Game" : "Add New Game"}</button>

        </form>
    )
}