import "./application.css"

import Popular from "./popular"
import {fetch_most_popular} from "./api"

import React from "react"

function Main() {
    return (
        <React.Fragment>
            <div className="main-title">
                <header className="main-header">
                    <p>A sad day... Click to <a className="creator-link" href="https://fibonet.ro">learn, forget and forgive.</a></p>
                    <button onClick={() => fetch_most_popular("Python")}>check</button>
                </header>
            </div>
            <div className="container">
                <Popular />
            </div>
        </React.Fragment>
    );
}

export default Main;
