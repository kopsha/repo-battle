import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"

import {ThemeProvider} from "./theme"
import "./theme.css"
import "./application.css"
import Loading from "./loading"
import Navigator from "./navigator"

const Popular = React.lazy(() => import("./popular"))
const Battle = React.lazy(() => import("./battle"))
const Results = React.lazy(() => import("./results"))

class Main extends React.Component {
    state = {
        theme: "light",
        toggleTheme: () => {
            this.setState(({theme}) => ({
                theme: theme === "light" ? "dark" : "light"
            }))
        }
    }
    render() {
        return (
            <BrowserRouter>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Navigator />
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path="/" component={Popular} />
                                    <Route exact path="/battle" component={Battle} />
                                    <Route path="/battle/results" component={Results} />
                                    <Route render={() => <h1>Not found. Keep trying!</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        )
    }
}

export default Main;
