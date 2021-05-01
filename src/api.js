export function fetch_most_popular (language) {
    const host = "api.github.com"
    const query = "stars:>1" + (language ? " language:" + encodeURIComponent(language) : "")
    const endpoint = `https://${host}/search/repositories?q=${query}&sort=stars&order=desc`

    return fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }
            let results = data.items.map(x => ({url: x.url, stars: x.stargazers_count}))
            return results
        })
}
