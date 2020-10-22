import React from 'react'
import { cache as imageCache } from '../util/imageImporter'
import { basicItems, combinedItems } from '../util/itemFactory'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComponents: false
    }
  }

  render () {
    const { showComponents } = this.state
    const { id } = this.props
    const itemIds = id > 9 ? basicItems(id) : combinedItems(id)

    return (
      <div
        className="relative"
        onMouseEnter={() => this.setState({ showComponents: true })}
        onMouseLeave={() => this.setState({ showComponents: false })}
      >
        <img
          src={imageCache.items[id]}
          alt=""
        />
        {showComponents &&
          <div className="absolute flex transform -translate-y-100%">
            {itemIds.map(tipId => (
              <div
                key={'tooltip-subitem-' + tipId}
                className="w-12 h-12"
              >
                <img
                  src={imageCache.items[tipId]}
                  alt=""
                />
              </div>
            ))}
          </div>
        }
      </div>
    )
  }
}

export default Item