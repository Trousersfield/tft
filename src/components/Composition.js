import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { printTraitName } from '../util/formatter'

class Composition extends React.Component {
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
    const name = this.props.name
    const imageNames = name.split(' ').reduce((result, curr) => {
      result.push('./' + curr.trim().toLowerCase() + '.png')
      return result
    }, [])
    const imageSize = this.state.imageSize

    return (
      <div className="flex flex-no-wrap items-center border-2 border-indigo-500 rounded">
        {imageNames.map(imageName => (
          <div
            key={'img-trait-container-' + imageName}
            className={'bg-indigo-500 ' + imageSize}
          >
            <img
              src={imageCache.traits[imageName]}
              alt=""
              style={{width: imageSize.width, height: imageSize.height}}
            />
          </div>))}
        <p className="px-3 py-3 text-indigo-500">
          {printTraitName(name)}
        </p>
      </div>
    )
  }
}


export default Composition