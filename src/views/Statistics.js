import React from 'react'
import {
  Route,
  Switch,
  withRouter } from 'react-router-dom'
import pengu from '../assets/images/pengu.jpg'

// components
const Champions = React.lazy(() => import('./Champions'))
const Items = React.lazy(() => import('./Items'))

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleNavigation (to) {
    this.props.history.push(to)
  }

  render () {
    const { path, url } = this.props.match
    const statCardClassNames = "w-96 h-64 bg-gray-800 rounded overflow-hidden cursor-pointer"

    return (
      <div className="">
        <div className="flex justify-center space-x-8 pt-12">
          <div
            className={statCardClassNames}
            onClick={() => this.handleNavigation(`${url}/champions`)}
          >
            <div className="h-32 overflow-hidden">
              <img src={pengu} alt="" />
            </div>
            <div className="py-2 px-3 tracking-wide">
              <p className="font-semibold text-lg text-gray-100">Champions</p>
              <p className="text-gray-300">Find out how often champions are played within each tier, how many one, two and three star units are made</p>
            </div>
          </div>
          <div
            className={statCardClassNames}
            onClick={() => this.handleNavigation(`${url}/items`)}
          >
            <div className="h-32 overflow-hidden">
              <img src={pengu} alt="" />
            </div>
            <div className="py-2 px-3 tracking-wide">
              <p className="font-semibold text-lg text-gray-100">Items</p>
              <p className="text-gray-300">Check the most build items in end-game teams</p>
            </div>
          </div>
        </div>
        <Switch>
          <Route
            path={`${path}/champions`}
            exact
            component={Champions}
          />
          <Route path={`${path}/items`}
            exact
            component={Items}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Statistics)