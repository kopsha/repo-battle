import React from "react"
import {NavLink} from "react-router-dom"
import {ThemeConsumer} from "./theme"

import "./navigator.css"


const activeLinkStyle = {
    color: "rgb(187, 46, 31)"
}

export default function Navigator() {
    return (
        <ThemeConsumer>
            {({theme, toggleTheme}) => (
                <nav className="row space-between">
                    <ul className="row nav">
                        <li>
                            <NavLink
                                to="/"
                                exact activeStyle={activeLinkStyle}
                                className="nav-link"
                            >
                                Popular
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/battle"
                                activeStyle={activeLinkStyle}
                                className="nav-link"
                            >
                                Battle
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        className="btn-clear btn-toggle-theme"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? "🌒" : "🌞"}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}