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
        <div className="h-screen relative overflow-hidden">
          <nav className="absolute z-20 flex h-16 bg-gray-800 text-gray-100 text-xl antialiased w-full">
            <div className="w-64 flex items-center">
              <NavLink
                to={'/'}
                className=""
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ml-2 border-2 border-gray-300 hover:border-green-500">
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

          <div className="relative h-full mt-16 pb-16 overflow-auto bg-gray-900">
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
            <div className="w-full h-24 bg-gray-800 flex justify-center items-center">
              <p className="tracking-wide font-semibold text-gray-100 italic text-center">
                TFTracker isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone
                officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties
                are trademarks or registered trademarks of Riot Games, Inc.
              </p>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

const TopNavLink = (props) => {
  return (
    <NavLink
      to={props.path}
      activeClassName="border-b-2 border-gray-200 hover:border-green-500"
      className="font-semibold tracking-wide p-2 mx-1 my-auto whitespace-no-wrap hover:text-green-500"
      isActive={(match, location) => {
        if (!match) {
          return false
        }

        if (match.url === "" || match.isExact) {
          return match.url === location.pathname
        }
        return location.pathname.includes(match.url)
      }}
    >
      {props.name}
    </NavLink>
  )
}

export default App