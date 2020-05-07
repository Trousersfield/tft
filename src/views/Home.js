import React from 'react'

const News = React.lazy(() => import('../components/News'))
const DatabaseStats = React.lazy(() => import('../components/DatabaseStats'))

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
          <DatabaseStats />
        </div>
      </div>
    )
  }
}

export default Home