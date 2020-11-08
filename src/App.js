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
    console.log('routes: ', routes)

    return (
      <Router>
        <div className="h-screen overflow-hidden">
          <div className="flex bg-white h-16 border-b border-gray-500 text-indigo-800">
            <nav className="flex-1 flex text-xl">
              <div className="mx-2 my-auto xs:hidden sm:hidden md:block">
                <NavLink
                  to={'/'}
                  className="uppercase tracking-wide"
                >
                  Teamfight Tracker
                </NavLink>
              </div>
              {routes.map((route) =>
                <TopNavLink key={'top-navigation-item-' + route.path}
                  path={route.path}
                  name={route.name}
                />
              )}
              <div className="mx-2 my-auto">
                <Suspense fallback={<div>Loading Patch ...</div>}>
                  <PatchSelector/>
                </Suspense>
              </div>
            </nav>
          </div>

          <div className="relative h-full overflow-auto pb-16">
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

const TopNavLink = (path, name) => {
  return (
    <NavLink
      to={path || ''}
      activeClassName="font-bold border-b-2 border-indigo-800"
      className="p-2 mx-1 my-auto whitespace-no-wrap"
    >
      {name.toString()}
    </NavLink>
  )
}

export default App