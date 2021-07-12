// just in case
// const client = "CLIENT_ID"
// const secret = "Client Secret"
// const params = `client_id=${client}&client_secret=${secret}`

const api_root = "https://api.github.com"

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

export function fetch_profile(username) {
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

export function fetch_repos(username) {
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
