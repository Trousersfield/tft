import React from 'react'

class InfoTag extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  render () {
    return (
      <div className="flex flex-no-wrap items-center text-white border-2 border-gray-700 rounded">
        <p className="px-3">
          {this.props.title}
        </p>
        <p className="p-3 tracking-wider bg-gray-700 font-bold">
          {this.props.value}
        </p>
      </div>
    )
  }
}

export default InfoTag