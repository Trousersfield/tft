import React from 'react'

class Patchnotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notes: 'some patchnotes' }
  }

  render () {
    return (
      <div>
        <div>Patch-notes: {this.state.notes}</div>
      </div>
    )
  }
}

export default Patchnotes