import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { cache as setData } from '../util/setDataImporter'
import { basicItems, combinedItems } from '../util/itemFactory'

import data from '../static/itemPopularityDiamond.json'

const ItemChart = React.lazy(() => import('../components/charts/ItemChart'))

class Items extends React.Component {
  constructor(props) {
    super(props)

    if (!imageCache['items']) importImages('items')
  }

  render () {
    const items = setData['items']

    const bi = basicItems({id: 34})
    console.log(bi)

    const ci = combinedItems({id: 1 })
    console.log(ci)

    return (
      <div>
          <h1>Hi! I am the Items Component</h1>
          <div className="flex">
            <div className="flex-1 flex flex-col">
              {data.map((item, i) =>
                <ItemRow key={'item-row-' + i}
                  rowIndex={i}
                  item={item}
                />
              )}
            </div>
            <div className="flex-1">
              <Suspense fallback={<div>Loading Item Chart...</div>}>
                <ItemChart data={data}/>
              </Suspense>
            </div>
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