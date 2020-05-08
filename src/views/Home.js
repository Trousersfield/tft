import React from 'react'

const News = React.lazy(() => import('../components/News'))
const DataStats = React.lazy(() => import('../components/DataStats'))

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="w-full flex flex-col">
        <div className="py-4">
          <News />
        </div>
        <div className="py-4">
          <DataStats />
        </div>
      </div>
    )
  }
}

export default Home