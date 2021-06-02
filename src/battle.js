import React from "react"
import PropTypes from "prop-types"
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle} from "react-icons/fa"
import {Link} from "react-router-dom"

import {ThemeConsumer} from "./theme"

import "./battle.css"


function Instructions() {
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className="battle-container">
                    <h1 className="center-text header-lg">Instructions</h1>
                    <ol className="container-sm grid center-text battle-instructions">
                        <li>
                            <h4 className="header-sm">Choose opponents</h4>
                            <FaUserFriends className={`bg-${theme}`} color="rgb(255, 191, 116)" size={89}/>
                        </li>
                        <li>
                            <h4 className="header-sm">Battle</h4>
                            <FaFighterJet className={`bg-${theme}`} color="#727272" size={89}/>
                        </li>
                        <li>
                            <h4 className="header-sm">See who won</h4>
                            <FaTrophy className={`bg-${theme}`} color="rgb(255, 215, 0)" size={89}/>
                        </li>
                    </ol>
                </div>
            )}
        </ThemeConsumer>
    )
}


class PlayerInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    handleChange(event) {
        this.setState({username: event.target.value})
    }

    render() {
        return (
            <ThemeConsumer>
                {({theme}) => (
                    <form className="column player" onSubmit={this.handleSubmit}>
                        <label htmlFor="username" className="player-label">
                            {this.props.label}
                        </label>
                        <div className="row player-input">
                            <input
                                type="text"
                                id="username"
                                className={`input-${theme}`}
                                placeholder="github user"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <button
                                className={`btn btn-${theme === "dark" ? "light" : "dark"}`}
                                type="submit"
                                disabled={!this.state.username}
                            >
                                Pick
                            </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}


function OpponentPreview({label, username, onReset}) {
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className="column player">
                    <h3 className="player-label">{label}</h3>
                    <div className={`row bg-${theme}`}>
                        <div className="player-info">
                            <img
                                className="avatar-small"
                                src={`https://github.com/${username}.png?size=55`}
                                alt={`avatar for ${username}`}
                                />
                            <a className="hard-link"
                                href={`https://github.com/${username}`}>
                                {username}
                            </a>
                        </div>
                        <button className="btn-clear flex-center" onClick={onReset}>
                            <FaTimesCircle size={21} color='rgb(194, 57, 42)'/>
                        </button>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    )
}
OpponentPreview.propTypes = {
    label: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
}


export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }
    handleReset(id) {
        this.setState({
            [id]: null
        })
    }
    render() {
        const {playerOne, playerTwo} = this.state
        return (
            <React.Fragment>
                <Instructions />
                <div className="battle-container">
                    <h1 className="center-text header-lg">Opposing forces</h1>
                    <div className="row space-around">
                        { (playerOne === null)
                            ? <PlayerInput
                                label="Left corner"
                                onSubmit={(username) => this.handleSubmit("playerOne", username)}
                                />
                            : <OpponentPreview
                                label="Left corner"
                                username={playerOne}
                                onReset={() => this.handleReset("playerOne")}
                                />
                        }
                        { (playerTwo === null)
                            ? <PlayerInput
                                label="Right corner"
                                onSubmit={(username) => this.handleSubmit("playerTwo", username)}
                                />
                            : <OpponentPreview
                                label="Right corner"
                                username={playerTwo}
                                onReset={() => this.handleReset("playerTwo")}
                                />
                        }
                    </div>

                    {playerOne && playerTwo && (
                        <Link
                            className="btn btn-dark btn-space"
                            to={{
                                pathname: "/battle/results",
                                search: `?left=${playerOne}&right=${playerTwo}`
                            }}
                        >
                            Battle
                        </Link>
                    )}

                </div>
            </React.Fragment>
        )
    }
}
