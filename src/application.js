import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Popular from "./popular"
import {ThemeProvider} from "./theme"
import Navigator from "./navigator"
import Battle from "./battle"
import Results from "./results"


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
                            <Switch>
                                <Route exact path="/" component={Popular} />
                                <Route exact path="/battle" component={Battle} />
                                <Route path="/battle/results" component={Results} />
                                <Route render={() => <h1>Not found. Keep trying!</h1>} />
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        )
    }
}

export default Main;
