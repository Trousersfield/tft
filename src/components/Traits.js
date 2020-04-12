import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'

class Traits extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}

    if (!imageCache['traits']) importImages('traits')
  }

  render () {
    const traits = this.props.data

    return (
      <div className="flex flex-no-wrap">
        {traits.map(trait =>
          <div
            key={'trait-' + trait}
            className="w-16 h-16">
            <img
              src={imageCache['traits'][getImageName(trait)]}
              alt={trait}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Traits