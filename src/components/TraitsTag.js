import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'

class TraitsTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: this.props.size || 'normal',
      imageSize: 'w-12 h-12'
    }

    if (!imageCache.traits) {
      importImages('traits')
    }
  }

  componentDidMount () {
    this.computeDimension()
  }

  computeDimension () {
    let imageSize = 0
    switch (this.state.size) {
      case 'sm':
        imageSize = 'w-8 h-8'
        break
      case 'normal':
        imageSize = 'w-12 h-12'
        break
      case 'lg':
        imageSize = 'w-16 h-16'
        break
      case 'xl':
        imageSize = 'w-20 h-20'
        break
      default:
        break
    }
    this.setState({ imageSize })
  }

  render () {
    const ids = this.props.ids
    const idsLowerCase = ids.map(id => (`${id[0].toLowerCase() + id.substring(1, id.length)}`)) // riot mixes upper and lower case...
    const imageSize = this.state.imageSize

    return (
      <div className="flex flex-no-wrap border-2 border-gray-700 rounded">
        <div className="inline-flex items-center bg-gray-700">
          {idsLowerCase.map(id => (
            id !== 'chosen' &&
            <div
              key={`trait-tag-image-${id}`}
              className={'flex items-center justify-center overflow-hidden ' + imageSize}
            >
              <img
                src={imageCache.traits[id]}
                alt=""
                style={{width: imageSize.width, height: imageSize.height}}
              />
            </div>
          ))}
        </div>
        <div className="px-3 py-3 text-white inline-flex items-center">
          {ids.map(id => (
            <p
              key={`trait-tag-name-${id}`}
              className="ml-2"
            >
              {id !== 'Chosen' ?
                setData.traits[id].name
                :
                'Chosen'
              }
            </p>
          ))}
        </div>
      </div>
    )
  }
}


export default TraitsTag