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
  }

  render () {
    const { id, items } = this.props
    console.log('id: ', id)
    console.log('items: ', items)

    return (
      <div className="absolute z-10 transform -translate-y-100% bg-indigo-500 w-32 h-32">
        <p className="font-semibold text-gray-900">
          {setData.champions[id]}
        </p>
        <div className="flex">
        </div>
      </div>
    )
  }
}

export default ChampionPopup