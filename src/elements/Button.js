import React from 'react'

class Button extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    const text = this.props.text || ''
    const color = this.props.color || 'blue'
    const disabled = this.props.disabled || false
    const font = this.props.font || 'font-semibold'
    const rounded = this.props.rounded ? 'rounded' : ''

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