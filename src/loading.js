import React from "react"
import PropTypes from "prop-types"

const styling = {
    content: {
        fontSize: "34px",
        position: "absolute",
        left: 0,
        right: 0,
        marginTop: "21px",
        textAlign: "center",
    }
}

export default class Loading extends React.Component {
    state = {
        tick: 0,
        content: this.props.text
    }
    advanceTick = () => {
        const dot = String.fromCharCode(183)
        const {tick} = this.state
        if (tick === 4) {
            this.setState({tick: 0, content: this.props.text})
        } else {
            const new_content = `${dot.repeat(tick)} ${this.props.text} ${dot.repeat(tick)}`
            this.setState({tick: tick + 1, content: new_content})
        }
    }
    componentDidMount() {
        this.ticker = window.setInterval(this.advanceTick, this.props.period)
    }
    componentWillUnmount() {
        window.clearInterval(this.ticker)
    }
    render() {
        return (
            <p style={styling.content}>{this.state.content}</p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    period: PropTypes.number.isRequired,
}

Loading.defaultProps = {
    text: "wait",
    period: 377,
}
