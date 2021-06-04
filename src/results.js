import React from "react"
import PropTypes from "prop-types"
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaStackOverflow, FaUser} from "react-icons/fa"
import {Link} from "react-router-dom"

import {fetch_profile, fetch_repos} from "./github_api"
import Loading from "./loading"
import Tooltip from "./tooltip"
import Card from "./card"


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
        // new Promise(resolve => setTimeout(resolve, 3666)),
    ]).then(([profile, repos]) => ({profile, score: tallyUserScore(profile, repos)}))
}

function fight(players) {
    return Promise.all([
        fetch_user_data(players[0]),
        fetch_user_data(players[1])
    ]).then((results) => results.sort((a, b) => b.score - a.score))
}

function PlayerArsenal({profile}) {
    return (
        <ul className="card-list">
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
                    <Tooltip text="User's company">
                        <FaBriefcase color="#795548" size={21}/>
                        {profile.company}
                    </Tooltip>
                </li>
            )}
            {profile.location && (
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color="rgb(144, 115, 255)" size={21}/>
                        {profile.location}
                    </Tooltip>
                </li>
            )}
        </ul>
    )
}
PlayerArsenal.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default class Results extends React.Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        in_progress: true,
    }
    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search)
        const left = searchParams.get("left")
        const right = searchParams.get("right")
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
            <React.Fragment>
                <h1 className="center-text header-lg">Battlefield</h1>
                <div className="grid space-around container-sm">
                    <Card
                        header={(winner.score === loser.score) ? "Tie" : "Winner"}
                        subheader={`${winner.score}`}
                        owner={winner.profile.login}
                        owner_url={winner.profile.html_url}
                        avatar_url={winner.profile.avatar_url}
                    >
                        <PlayerArsenal profile={winner.profile} />
                    </Card>
                    <Card
                        header={(winner.score === loser.score) ? "Tie" : "Loser"}
                        subheader={`${loser.score}`}
                        owner={loser.profile.login}
                        owner_url={loser.profile.html_url}
                        avatar_url={loser.profile.avatar_url}
                    >
                        <PlayerArsenal profile={loser.profile} />
                    </Card>
                </div>
                <Link to="/battle" className="btn btn-dark btn-space">CLEAR BODIES</Link>
            </React.Fragment>
        )
    }
}
