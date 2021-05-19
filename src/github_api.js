// just in case
// const client = "CLIENT_ID"
// const secret = "Client Secret"
// const params = `client_id=${client}&client_secret=${secret}`

const api_root = "http://api.github.com"

export function fetch_most_popular (language) {
    const query = "stars:>1" + (language ? " language:" + encodeURIComponent(language) : "")
    const endpoint = `${api_root}/search/repositories?q=${query}&sort=stars&order=desc`

    return fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
}

function fetch_profile(username) {
    const endpoint = `${api_root}/users/${username}`
    return fetch(endpoint)
        .then((response) => response.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(profile.message)
            }

            return profile
        })
}

function fetch_repos(username) {
    const endpoint = `${api_root}/users/${username}/repos`
    return fetch(endpoint)
        .then((response) => response.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(repos.message)
            }

            return repos
        })
}

function tallyUserScore(followers, repos) {
    const stars = repos.reduce((acc, {stargazers_count}) => acc + stargazers_count, 0)
    return followers * 4 + stars
}

function fetch_user_data (username) {
    return Promise.all([
        fetch_profile(username),
        fetch_repos(username)
    ]).then(([profile, repos]) => ({profile, score: tallyUserScore(profile.followers, repos)}))
}

export function fight(players) {
    return Promise.all([
        fetch_user_data(players[0]),
        fetch_user_data(players[1])
    ]).then((results) => results.sort((a, b) => b.score - a.score))
}
