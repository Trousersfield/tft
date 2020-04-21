import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

class PatchNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notes: 'some PatchNotes' }

    if (!imageCache['traits']) importImages('traits')
  }

  render () {
    return (
      <div className="flex flex-col">
        <div>Patch-notes: {this.state.notes}</div>
        <div className="mt-6 bg-green-200 h-48 p-4">
          <div className="relative">
            <img
              src={imageCache['traits']['./bg.png']}
              alt="bg"
            />
            <img
              src={imageCache['traits']['./blademaster.png']}
              alt="blademaster"
              className="absolute top-0"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PatchNotes