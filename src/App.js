import React, { Suspense } from 'react'
import { PatchContext, patch } from './context/Patch'
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
      this.setState(state => {
        const user = state.user
        Object.assign(user, payload)
        return { user }
      })
    }

    this.setPatch = (payload) => {
      this.setState(state => {
        const patch = state.patch
        Object.assign(patch, payload)
        console.log('setting new patch to ', patch)
        return { patch }
      })
    }

    this.state = {
      routes: Routes.routes,
      user,
      setUser: this.setUser,
      patch,
      setPatch: this.setPatch
    }

    // import static set data
    importSetData()
  }

  render () {
    const { routes } = this.state
    const menuItems = routes.reduce((result, curr) => {
      if (curr.category) {
        const contained = result.find(r => r.path === curr.category)
        if (contained) return result
      }
      if (curr.noMenu) return result
      result.push(curr)
      return result
    }, [])

    return (
      <Router>
        <div className="h-screen overflow-hidden">
          <div className="flex bg-white h-16 border-b border-gray-500
            text-indigo-800">
            <nav className="flex-1 flex text-xl">
              <div className="mx-2 my-auto xs:hidden sm:hidden md:block">
                <NavLink
                  to={'/'}
                  className="uppercase tracking-wide"
                >
                  Team Fight Stats
                </NavLink>
              </div>
              {menuItems.map((route) =>
                <TopMenuItem key={'menu-item-' + route.path}
                  {...route}
                />
              )}
            </nav>
            <div className="mx-2 my-auto">
              <PatchContext.Provider value={this.state}>
                <Suspense fallback={<div>Loading Patch ...</div>}>
                  <PatchSelector />
                </Suspense>
              </PatchContext.Provider>
            </div>
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

const TopMenuItem = (item) => {
  return (
    <NavLink
      to={item.path || ''}
      activeClassName="font-semibold border-b-2 border-indigo-800"
      className="p-2 mx-1 my-auto whitespace-no-wrap"
    >
      {item.name}
    </NavLink>
  )
}

export default App
