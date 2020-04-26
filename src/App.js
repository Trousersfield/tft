import React, { Suspense } from 'react'
import { UserContext, user } from './context/User'
import './App.css'
/// import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom"
import Routes from './routes'
import { importSetData } from './util/setDataImporter'


const PatchSelector = React.lazy(() => import('./components/PatchSelector'))

class App extends React.Component {
  constructor (props) {
    super (props)

    this.setUser = (payload) => {
      console.log('payloaD: ', payload)
      this.setState({ [payload.key]: payload.value })
    }

    this.state = {
      routes: Routes.routes,
      // patch: user.patch,
      user,
      setUser: this.setUser
    }

    // import static set data
    importSetData()
    // const routes = Routes.routes
  }

  render () {
    const { routes } = this.state
    const menuItems = routes.reduce((result, curr) => {
      if (curr.category) {
        const contained = result.find(r => r.path === curr.category)
        if (contained) return result
      }
      result.push(curr)
      return result
    }, [])

    return (
      <Router>
        <div className="h-screen overflow-hidden">
          <div className="flex bg-indigo-100 h-16">
            <nav className="flex-1 flex text-xl">
              <div className="mx-2 my-auto">
                <p className="uppercase">Team Fight Stats</p>
              </div>
              {menuItems.map((route) =>
                <TopMenuItem key={'menu-item-' + route.path}
                  {...route}
                />
              )}
            </nav>
            <div className="mx-2 my-auto">
              <UserContext.Provider value={this.state}>
                <Suspense fallback={<div>Loading Patch ...</div>}>
                  <PatchSelector />
                </Suspense>
              </UserContext.Provider>
            </div>
          </div>

          <div className="relative h-full overflow-auto pb-16">
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {routes.map((route) =>
                  <RouteWithSubRoutes
                    key={'route-to-' + route.path}
                    {...route}
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

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={(props) => (
        <>
          <route.component {...props} exact />
          <Switch>
            {route.routes && route.routes.map((subRoute) =>
              <RouteWithSubRoutes
                key={'route-to-' + subRoute.path}
                {...subRoute}
              />
            )}
          </Switch>
        </>
      )}
    />
  )
}

const TopMenuItem = (item) => {
  return (
    <NavLink
      to={item.path || ''}
      exact
      activeClassName="text-indigo-900 font-semibold border-b-2 border-indigo-900"
      className="p-2 mx-1 my-auto"
    >
      {item.name}
    </NavLink>
  )
}

export default App
