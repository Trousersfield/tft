import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

class Traits extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}

    if (!imageCache.traits) {
      importImages('traits')
    }
  }

  render () {
    const traitIds = this.props.traitIds

    return (
      <div className="flex flex-no-wrap">
        {traitIds.map((id, index) =>
          <div  key={'trait-' + id} >
            <img
              src={imageCache.traits[id]}
              alt=""
              className={`w-10 h-10 ${index > 0 ? 'ml-1' : ''}`}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Traits