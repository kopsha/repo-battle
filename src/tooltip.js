import React from "react"
import PropTypes from "prop-types"

import withHover from "./with-hover"

const styles = {
    container: {
        position: "relative",
        display: "flex",
    },
    tooltip: {
        boxSizing: "border-box",
        position: "absolute",
        width: "144px",
        bottom: "100%",
        left: "50%",
        marginLeft: "-89px",
        marginBottom: "5px",
        borderRadius: "3px",
        backgroundColor: "hsla(0, 0%, 20%, 0.9)",
        padding: "8px",
        color: "#fff",
        textAlign: "center",
        fontSize: "13px",
    }
}

function Tooltip({text, children, hovering}) {
    return (
        <div style={styles.container}>
            {hovering === true && (
                <div style={styles.tooltip}>
                    {text}
                </div>
            )}
            {children}
        </div>
    )
}
Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    hovering: PropTypes.bool.isRequired,
}

export default withHover(Tooltip)
