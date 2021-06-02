import React from "react"

// import Popular from "./popular"
import {ThemeProvider} from "./theme"
import Navigator from "./navigator"
import Battle from "./battle"

import "./application.css"
import "./theme.css"


class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: "light",
            toggleTheme: () => {
                this.setState(({theme}) => ({
                    theme: theme === "light" ? "dark" : "light"
                }))
            }
        }
    }
    render() {
        return (
            <ThemeProvider value={this.state}>
                <div className={this.state.theme}>
                    <div className="container">
                        <Navigator />
                        <Battle />
                        {/* <Popular /> */}
                        </div>
                </div>
            </ThemeProvider>
        )
    }
}

export default Main;
