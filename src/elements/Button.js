import React from 'react'

class Button extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text || '',
      color: this.props.color || 'blue',
      disabled: this.props.disabled || false,
      font: this.props.font || 'font-semibold',
      rounded: this.props.rounded ? 'rounded' : ''
    }
  }

  render () {
    const { text, color, disabled, font, rounded } = this.state

    return (
      <button
        className={`bg-${color}-500 hover:bg-${color}-700 ${font} ${rounded} text-white px-2 py-1`}
        disabled={disabled}
        onClick={this.props.onClick}
      >
        {text}
      </button>
    )
  }
}

export default Button