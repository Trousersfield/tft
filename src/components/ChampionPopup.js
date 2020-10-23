import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'

const Traits = React.lazy(() => import('./Traits'))

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
      <div className="absolute z-10 transform -translate-y-100% bg-gray-100 border-2 border-gray-300 shadow-lg w-96 p-2 rounded">
        <div className="flex">
          <img
            src={imageCache.champions[id]}
            alt=""
            className="w-10 h-10"
          />
          <div className="flex items-center justify-between w-full ml-2 pb-1 border-b-2 border-gray-400">
            <p className="text-lg font-semibold text-gray-900">
              {champion.name}
            </p>
            <div className="flex items-center">
              <p className="font-semibold mr-1">
                {champion.cost}
              </p>
              <img
                src={imageCache.other['gold']}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-2">
          {setData.champions[id].traits.map(traitId => (
            <div
              key={'champion-' + id + 'trait-' + traitId}
              className="flex items-center"
            >
              <p className="mr-2">
                {setData.traits[traitId].name}
              </p>
              <img
                src={imageCache.traits[traitId.toLowerCase()]}
                alt=""
                className="w-10 h-10"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <p className="mr-2">
            Popular items:
          </p>
          {items.map((item, index) => (
            <div key={'item-' + id + '-' + item.itemId} className={`w-10 h-10 rounded-sm overflow-hidden ${index > 0 ? 'ml-1' : ''}`}>
              <img
                src={imageCache.items[item.itemId]}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ChampionPopup