import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as dataCache } from '../util/setDataImporter'
import { basicItems, combinedItems } from '../util/itemFactory'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComponents: false
    }

    if (!imageCache.items) {
      importImages('items')
    }
  }

  render () {
    const { showComponents } = this.state
    const { id, size } = this.props
    const itemIds = id > 9 ? basicItems(id) : combinedItems(id)
    const item = dataCache.items[id]

    return (
      <div
        className={size}
        onMouseEnter={() => this.setState({ showComponents: true })}
        onMouseLeave={() => this.setState({ showComponents: false })}
      >
        <img
          src={imageCache.items[id]}
          alt=""
        />
        {showComponents &&
          <div className="absolute z-10 transform -translate-y-100% bg-gray-100 border-2 border-gray-300 shadow-lg w-96 p-2 rounded">
            <div className="flex">
              <img
                src={imageCache.items[id]}
                alt=""
                className="w-10 h-10"
              />
              <div className="flex items-center justify-between w-full ml-2 pb-1 border-b-2 border-gray-400">
                <p className="font-semibold">
                  {item.name}
                </p>
                <div className="flex">
                  {itemIds.map((subitemId, index) => (
                    <img
                      key={'tooltip-subitem-' + index + '-' + subitemId}
                      src={imageCache.items['0' + subitemId]}
                      alt=""
                      className={`w-8 h-8 ${index === 1 ? 'ml-1' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm">
              {item.description}
            </p>
          </div>
        }
      </div>
    )
  }
}

export default Item