import React, { Suspense } from 'react'

const ItemChart = React.lazy(() => import('../components/charts/ItemChart'))

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    // const { data, includeBasicItems } = this.state
    // const items = setData['items']

    // const bi = basicItems({id: 34})
    // console.log(bi)

    // const ci = combinedItems({id: 1 })
    // console.log(ci)

    return (
      <div className="flex flex-col mx-auto lg:w-full xl:w-3/5">
        <Suspense fallback={<div>Loading Item Chart...</div>}>
          <ItemChart/>
        </Suspense>
      </div>
    )
  }
}

export default Items