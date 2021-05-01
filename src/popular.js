import React from "react"
import PropTypes from "prop-types"
import {fetch_most_popular} from "./github_api"
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from "react-icons/fa"


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
LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onSelectLanguage: PropTypes.func.isRequired,
}


function RepositoriesGrid ({repos}) {
    return (
        <ul className="grid space-around">
            {repos.map((repo, index) => {
                const {name, owner, html_url, stargazers_count, forks, open_issues} = repo
                const {login, avatar_url} = owner

                return (
                    <li key={html_url} className="repo bg-light">
                        <h4 className="header-lg center-text">#{index + 1}</h4>
                        <img className="avatar" src={avatar_url} alt={`${login}'s avatar.`}/>
                        <h2 className="center-text">
                            <a className="link" href={html_url}>{name}</a>
                        </h2>
                        <ul className="repo-cards">
                            <li><FaUser color="rgb(255, 191, 116)" size={22}/>{login}</li>
                            <li><FaStar color="rgb(255, 215, 0)" size={22}/>{stargazers_count.toLocaleString()} stars</li>
                            <li><FaCodeBranch color="rgb(129, 195, 245)" size={22}/>{forks.toLocaleString()} forks</li>
                            <li><FaExclamationTriangle color="rgb(241, 138, 147)" size={22}/>{open_issues.toLocaleString()} issues</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
RepositoriesGrid.propTypes = {
    repos: PropTypes.array.isRequired,
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

                {repos[selected] && <RepositoriesGrid repos={repos[selected]} />}
            </React.Fragment>
        )
    }
}

export default Popular
