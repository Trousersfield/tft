import React from 'react'

class Comb extends React.Component {
  constructor(props) {
    super(props)
    this.state = { comb: 'a comb' }
  }

  render () {
    return (
      <div>
        <div>Comb: {this.props.comb.name}</div>
      </div>
    )
  }
}

export default Comb;