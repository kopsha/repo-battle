import React from "react"

import {fetch_most_popular} from "./api"

function LanguagesNav ({selected, onSelectLanguage}) {
    const languages = ["All", "Python", "Ruby", "Haskell", "F#", "Clojure", "Elm", "Lisp", "JavaScript"]

    return (
        <ul className="flex-center">
            {languages.map( (lang) => (
                <li key={lang}>
                    <button
                        className={`btn-clear nav-link ${lang === selected ? "link-selected" : null}`}
                        onClick={() => onSelectLanguage(lang)}>
                        {lang}
                    </button>
                </li>
            ))}
        </ul>
    )
}

class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: "All",
            repos: {},
            error_message: null,
        }

        this.selectLanguage = this.selectLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.selectLanguage(this.state.selected)
    }

    selectLanguage(new_selection) {
        const {repos} = this.state
        this.setState({
            selected: new_selection,
            error_message: null,
        })
        if (!repos[new_selection]) {
            console.log("fetching", new_selection)
            fetch_most_popular(new_selection)
                .then((data) => this.setState({
                        selected: new_selection,
                        error_message: null,
                        repos: {
                            ...repos,
                            [new_selection]: data,
                        }
                    })
                )
                .catch((error) => this.setState({error_message: error.message}))
        }
        else {
            console.log(new_selection, repos[new_selection])
        }
    }

    isLoading() {
        const {selected, repos, error_message} = this.state
        return !repos[selected] && error_message === null
    }

    render() {
        const {selected, repos, error_message} = this.state
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selected}
                    onSelectLanguage={this.selectLanguage}
                />

                {this.isLoading() && <p>loading...</p>}

                {error_message && <p className="error-message">Houston, we've got a problem: {error_message}</p>}

                {repos[selected] && <pre>{JSON.stringify(repos[selected], null, 4)}</pre>}
            </React.Fragment>
        )
    }
}

export default Popular
