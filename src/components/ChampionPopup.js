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
  }

  render () {
    const { id, items } = this.props
    const champion = setData.champions[id]

    return (
      <div className="absolute z-10 transform -translate-y-100% bg-gray-100 border-2 border-gray-300 shadow-lg w-64 p-2 rounded">
        <div className="flex items-center justify-between pb-1 border-b-2 border-gray-400">
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
        <div className="flex items-center mt-2">
          {items.map(item => (
            <div key={'item-' + id + '-' + item.itemId} className="w-12 h-12 m-1 rounded-sm overflow-hidden">
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