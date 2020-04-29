import React from 'react'
// import patches from '../static/patchNotes/'

class PatchEffect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patchNumber: undefined
    }
  }

  componentDidMount () {
    console.log('patch effect did mount!')
  }

  render () {
    return (
      <div className="flex relative h-full">
        I'm in!!!
      </div>
    )
  }
}

export default PatchEffect