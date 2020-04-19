import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'
import { cache as dataCache } from '../util/setDataImporter'

class TraitInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state= {
      trait: this.props.trait
    }

    if (!imageCache['traits']) importImages('traits')
  }

  componentDidMount () {
    console.log('set data: ', dataCache)
  }

  render () {
    const { trait } = this.state
    if (!trait) {
      return (
        null
      )
    }

    const imageName = getImageName(trait)
    console.log('trait: ', trait)
    console.log('image name: ', imageName)

    return (
      <div className="flex flex-no-wrap">
        <img
          src={imageCache['traits'][imageName]}
          alt={trait}
        />
      </div>
    )
  }
}

export default TraitInfo