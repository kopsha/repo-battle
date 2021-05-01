export function fetch_most_popular (language) {
    const host = "api.github.com"
    const query = "stars:>1" + (language ? " language:" + encodeURIComponent(language) : "")
    const endpoint = `https://${host}/search/repositories?q=${query}&sort=stars&order=desc`

    // console.log(endpoint)

    return fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }
            return data.items
        })
}
