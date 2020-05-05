import React from 'react'

const News = React.lazy(() => import('../components/News'))

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="w-full">
        <News />
      </div>
    )
  }
}

export default Home