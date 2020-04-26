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

  render () {
    const { trait } = this.state
    if (!trait) {
      return (
        null
      )
    }

    const imageName = getImageName(trait)
    const traitData = dataCache['traits'].find(t => t.name === trait)

    return (
      <div className="sm:w-full md:w-1/2 lg:w-1/3">
        <div className="m-2 border-2 border-gray-500
          shadow-lg rounded flex flex-col">
          <div className="flex flex-no-wrap items-center
            xs:h-40 sm:h-32 md:h-28
            border-b border-gray-500 overflow-hidden">
            <img
              src={imageCache['traits'][imageName]}
              alt={trait}
              style={{width: '60px', height: '60px'}}
            />
            <p className="mr-2 py-2 text-sm">
              <span className="uppercase tracking-wide text-lg font-medium
                pr-1 mr-1 border-r-2 border-gray-900">
                {traitData.name}
              </span>
              {traitData.description ?
                traitData.description :
                traitData.innate}
            </p>
          </div>
          <div className="flex flex-no-wrap p-2">
            {traitData.sets.map((level, i) => (
              <div
                key={`level-${level.style}`}
                className={`flex-1 text-center
                  ${(i < traitData.sets.length - 1) ?
                    'border-r-2 border-gray-500' : ''}`
                }
              >
                {level.style}
                <p>{level.min}{level.max ? ` - ${level.max}` : '+'} units</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default TraitInfo