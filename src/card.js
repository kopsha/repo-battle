import React from "react"
import PropTypes from "prop-types"
import {ThemeConsumer} from "./theme"

export default function Card({
    header, subheader, owner, owner_url, avatar_url, children
}) {
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className={`card bg-${theme}`}>
                    <h4 className="header-sm center-text">{header}</h4>
                    <img className="avatar" src={avatar_url} alt={`Avatar of ${owner}`}/>
                    {subheader && (
                        <p className="center-text">{subheader}</p>
                    )}
                    <h2 className="center-text header-sm">
                        <a className="link"
                            href={owner_url}>
                            {owner}
                        </a>
                    </h2>
                    {children}
                </div>
            )}
        </ThemeConsumer>
    )
}

Card.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    owner: PropTypes.object.isRequired,
    owner_url: PropTypes.object.isRequired,
    avatar_url: PropTypes.number.isRequired,
}
