import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import routes from './routes'
import { importSetData } from './util/setDataImporter'

// components
const PatchSelector = React.lazy(() => import('./components/PatchSelector'))

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }

    // import static set data
    importSetData()
  }

  render () {
    return (
      <Router>
        <div className="h-screen overflow-hidden">
          <nav className="flex h-16 bg-gray-800 text-gray-100 text-xl antialiased w-full">
            <div className="flex items-center">
              <NavLink
                to={'/meta-compositions'}
                className=""
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ml-2">
                  <img src="favicon.jpg" alt="" />
                </div>
              </NavLink>
            </div>
            <div className="flex-1 flex justify-center items-center pl-2">
              {routes.map((route) =>
                <TopNavLink key={'top-navigation-item-' + route.path}
                  path={route.path}
                  name={route.name}
                />
              )}
            </div>
            <div className="flex items-center pr-2">
              <Suspense fallback={<div>Loading Patch Selector...</div>}>
                <PatchSelector />
              </Suspense>
            </div>
          </nav>

          <div className="relative h-full overflow-auto pb-16 bg-gray-900">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {routes.map((route) =>
                  <Route
                    key={'route-to-' + route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                )}
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    )
  }
}

const TopNavLink = (props) => {
  return (
    <NavLink
      to={props.path || ''}
      activeClassName="border-b-2 border-gray-200"
      className="font-semibold tracking-wide p-2 mx-1 my-auto whitespace-no-wrap"
    >
      {props.name}
    </NavLink>
  )
}

export default App