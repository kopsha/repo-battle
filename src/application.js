import React from "react"
import {BrowserRouter, Route} from "react-router-dom"

import Popular from "./popular"
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
            <BrowserRouter>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Navigator />
                            <Route exact path="/" component={Popular} />
                            <Route path="/battle" component={Battle} />
                        </div>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        )
    }
}

export default Main;
