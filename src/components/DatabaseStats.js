import React from 'react'

class DatabaseStats extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  render () {
    return (
      <div className="flex flex-col">
        <p>Latest Patch</p>
        <p>Games recorded</p>
        <p>Last update oder next update</p>
      </div>
    )
  }
}

export default DatabaseStats