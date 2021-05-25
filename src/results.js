import React from "react"
import PropTypes from "prop-types"
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaStackOverflow, FaUser} from "react-icons/fa"

import {fetch_profile, fetch_repos} from "./github_api"
import Loading from "./loading"


function tallyUserScore(profile, repos) {
    const stars = repos.reduce((acc, {stargazers_count}) => acc + stargazers_count, 0)
    const forks = repos.reduce((acc, {forks_count}) => acc + forks_count, 0)
    const watchers = repos.reduce((acc, {watchers_count}) => acc + watchers_count, 0)
    return (
        watchers + forks + stars
        + profile.public_repos + profile.followers + profile.following
    )
}

function fetch_user_data (username) {
    return Promise.all([
        fetch_profile(username),
        fetch_repos(username),
        new Promise(resolve => setTimeout(resolve, 3666)),
    ]).then(([profile, repos]) => ({profile, score: tallyUserScore(profile, repos)}))
}

function fight(players) {
    return Promise.all([
        fetch_user_data(players[0]),
        fetch_user_data(players[1])
    ]).then((results) => results.sort((a, b) => b.score - a.score))
}

function BattlefieldResult({label, profile, score}) {
    return (
        <div className="card bg-light">
            <h4 className="header-sm center-text">{label}</h4>
            <img className="avatar" src={profile.avatar_url} alt={profile.name}/>
            <p className="center-text">Score: {score.toLocaleString()}</p>
            <h3 className="center-text header-sm">
                <a className="link"
                    href={profile.html_url}>
                    {profile.login}
                </a>
            </h3>
            <ul>
                <li>
                    <FaUser color="rgb(239, 115, 115)" size={21}/>
                    {profile.name || "one has no name"}
                </li>
                <li>
                    <FaStackOverflow color="rgb(32, 64, 128)" size={21}/>
                    {profile.public_repos.toLocaleString()} repositories
                </li>
                <li>
                    <FaUsers color="rgb(195, 129, 245)" size={21}/>
                    {profile.followers.toLocaleString()} followers
                </li>
                <li>
                    <FaUserFriends color="rgb(64, 183, 95)" size={21}/>
                    {profile.following.toLocaleString()} following
                </li>
                {profile.company && (
                    <li>
                        <FaBriefcase color="#795548" size={21}/>
                        {profile.company}
                    </li>
                )}
                {profile.location && (
                    <li>
                        <FaCompass color="rgb(144, 115, 255)" size={21}/>
                        {profile.location}
                    </li>
                )}
            </ul>
        </div>
    )
}
BattlefieldResult.propTypes = {
    label: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired,
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
        this.setState({
            in_progress: true,
        })
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
            return <Loading text="hold on"/>
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
                        profile={winner.profile}
                        score={winner.score}
                        />
                    <BattlefieldResult
                        label={(winner.score === loser.score) ? "Tie" : "Loser"}
                        profile={loser.profile}
                        score={loser.score}
                    />
                </div>
            </div>
        )
    }
}
