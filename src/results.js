import React from "react"
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCodeBranch, FaUser} from "react-icons/fa"

import {fight} from "./github_api"


function BattlefieldResult({label, player}) {
    return (
        <div className="card bg-light">
            <h4 className="header-sm center-text">{label}</h4>
            <img className="avatar" src={player.profile.avatar_url} alt={player.profile.name}/>
            <p className="center-text">Score: {player.score.toLocaleString()}</p>
            <h3 className="center-text header-sm">
                <a className="link"
                    href={player.profile.html_url}>
                    {player.profile.login}
                </a>
            </h3>
            <ul>
                <li>
                    <FaUser color="rgb(239, 115, 115)" size={21}/>
                    {player.profile.name || "one has no name"}
                </li>
                <li>
                    <FaCodeBranch color="rgb(129, 195, 245)" size={21}/>
                    {player.profile.public_repos.toLocaleString()} repositories
                </li>
                <li>
                    <FaUsers color="rgb(195, 129, 245)" size={21}/>
                    {player.profile.followers.toLocaleString()} followers
                </li>
                <li>
                    <FaUserFriends color="rgb(64, 183, 95)" size={21}/>
                    {player.profile.following.toLocaleString()} following
                </li>
                {player.profile.company && (
                    <li>
                        <FaBriefcase color="#795548" size={21}/>
                        {player.profile.company}
                    </li>
                )}
                {player.profile.location && (
                    <li>
                        <FaCompass color="rgb(144, 115, 255)" size={21}/>
                        {player.profile.location}
                    </li>
                )}
            </ul>
        </div>
    )
}


export default class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            in_progress: true,
        }
    }
    componentDidMount() {
        const {left, right} = this.props
        fight([left, right])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    in_progress: false,
                })
            })
            .catch(({message}) => {
                this.setState({
                    winner: null,
                    loser: null,
                    error: message,
                    in_progress: false,
                })
            })
    }
    render() {
        const {winner, loser, error, in_progress} = this.state

        if (in_progress) {
            return <p>loading...</p>
        }

        if (error) {
            return <p className="error-message">{error}</p>
        }

        return (
            <div className="battle-container">
                <h1 className="center-text header-lg">Battlefield</h1>
                <div className="grid space-around container-sm">
                    <BattlefieldResult
                        label={(winner.score === loser.score) ? "Tie" : "Winner"}
                        player={winner}
                        />
                    <BattlefieldResult
                        label={(winner.score === loser.score) ? "Tie" : "Looser"}
                        player={loser}
                    />
                </div>
            </div>
        )
    }
}
