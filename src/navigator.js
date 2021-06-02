import React from "react"
import {ThemeConsumer} from "./theme"

import "./navigator.css"

export default function Navigator() {
    return (
        <ThemeConsumer>
            {({theme, toggleTheme}) => (
                <nav className="row space-between">
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