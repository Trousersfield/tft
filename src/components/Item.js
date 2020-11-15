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
          <div className="absolute z-10 transform -translate-y-100% bg-gray-800 w-96 rounded text-gray-100 overflow-hidden">
            <div className="flex m-2">
              <img
                src={imageCache.items[id]}
                alt=""
                className="w-12 h-12 border-2 border-gray-100"
              />
              <div className="flex-1 flex items-center justify-between">
                <p className="text-lg font-semibold tracking-wider ml-2">
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
            <p className="text-sm bg-gray-700 p-2">
              {item.description}
            </p>
          </div>
        }
      </div>
    )
  }
}

export default Item