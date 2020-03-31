import React from 'react'

class Comb extends React.Component {
  constructor(props) {
    super(props)
    this.state = { comb: 'a comb' }
  }

  render () {
    return (
      <div>Hey! I am a single comb: {this.state.comb}</div>
    )
  }
}

export default Comb;