import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'

class ChampionPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    if (!imageCache.champions) {
      importImages('champions')
    }
    if (!imageCache.other) {
      importImages('other')
    }
    if (!imageCache.traits) {
      importImages('traits')
    }
  }

  render () {
    const { id, items } = this.props
    const champion = setData.champions[id]

    return (
      <div className="absolute z-10 transform -translate-y-100% -translate-x-1/2 bg-gray-800 w-96 rounded text-gray-100 overflow-hidden">
        <div className="flex m-2">
          <img
            src={imageCache.champions[id]}
            alt=""
            className="w-12 h-12 border-2 border-gray-100"
          />
          <div className="flex items-center justify-between w-full ml-2 pb-1">
            <p className="text-lg font-semibold tracking-wider">
              {champion.name}
            </p>
            <div className="flex items-center">
              <p className="font-semibold mr-2">
                {champion.cost}
              </p>
              <img
                src={imageCache.other['gold']}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex bg-gray-700">
          <div className="w-1/2">
            {setData.champions[id].traits.map(traitId => (
              <div
                key={'champion-' + id + 'trait-' + traitId}
                className="flex items-center p-2"
              >
                <img
                  src={imageCache.traits[traitId.toLowerCase()]}
                  alt=""
                  className="w-8 h-8"
                />
                <p className="ml-2 text-lg tracking-wide">
                  {setData.traits[traitId].name}
                </p>
              </div>
            ))}
          </div>
          {items &&
          <div className="w-1/2 flex justify-center items-center">
            {items.map((item, index) => (
              <div
                key={'item-' + id + '-' + item.itemId}
                className={`w-10 h-10 rounded-sm overflow-hidden ${index > 0 ? 'ml-1' : ''}`}
              >
                <img
                  src={imageCache.items[item.itemId]}
                  alt=""
                />
              </div>
            ))}
          </div>
        }
        </div>
      </div>
    )
  }
}

export default ChampionPopup