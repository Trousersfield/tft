import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { cache as setData } from '../util/setDataImporter'
import { basicItems, combinedItems } from '../util/itemFactory'

import rawData from '../static/itemPopularityDiamond.json'

const ItemChart = React.lazy(() => import('../components/charts/ItemChart'))

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    if (!imageCache['items']) importImages('items')
  }

  render () {
    const { data, includeBasicItems } = this.state
    const items = setData['items']

    const bi = basicItems({id: 34})
    console.log(bi)

    const ci = combinedItems({id: 1 })
    console.log(ci)

    return (
      <div className="flex flex-col">
        <Suspense fallback={<div>Loading Item Chart...</div>}>
          <ItemChart data={rawData}/>
        </Suspense>
        <div className="flex flex-col">
          {rawData.map((item, i) =>
            <ItemRow key={'item-row-' + i}
              rowIndex={i}
              item={item}
            />
          )}
        </div>
      </div>
    )
  }
}

const ItemRow = (props) => {
  const { itemId, itemName, count } = props.item
  return (
    <div className="flex justify-start">
      <img
        src={imageCache['items'][`./${itemId < 10 ? '0' : ''}${itemId}.png`]}
      />
      <div>
        id: {itemId}
      </div>
      <div>
        item: {itemName}
      </div>
      <div>
        count: {count}
      </div>
    </div>
  )
}

export default Items