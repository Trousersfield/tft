import React from 'react'

class InfoTag extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  render () {
    return (
      <div className="flex flex-no-wrap items-center border-2 border-indigo-500 rounded">
        <p className="px-3">{this.props.title}</p>
        <p className="p-3 tracking-wider bg-indigo-500 font-bold text-white">
          {this.props.value}
        </p>
      </div>
    )
  }
}

export default InfoTag