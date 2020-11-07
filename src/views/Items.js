import React, { Suspense } from 'react'

const ItemChart = React.lazy(() => import('../components/charts/Item'))

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
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