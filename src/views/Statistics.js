import React from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'

// components
const Champions = React.lazy(() => import('./Champions'))
const Items = React.lazy(() => import('./Items'))

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const { path, url } = this.props.match

    console.log('path: ', path)
    console.log('url: ', url)

    return (
      <div>
        <ul>
          <li>
            <Link to={`${url}/champions`}>
              Champions
            </Link>
          </li>
          <li>
            <Link to={`${url}/items`}>
              Items
            </Link>
          </li>
        </ul>
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