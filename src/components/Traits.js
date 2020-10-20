import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

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
          <div  key={'trait-' + trait} >
            <img
              src={imageCache['traits'][trait.traitId]}
              alt={trait}
              className="w-16 h-16"
              title={trait}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Traits