import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

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

    return (
      <div>
        <Switch>
          <Route exact path={'/champions'}>
            <Champions />
          </Route>
          <Route>
            <Items exact path={'/items'} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(Statistics)