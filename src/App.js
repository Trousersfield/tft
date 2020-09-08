import React, { Suspense } from 'react'
// import { PatchContext, patch } from './context/Patch'
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
import http from './util/http'

const PatchSelector = React.lazy(() => import('./components/PatchSelector'))

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      routes: Routes.routes,
      // patch,
      // setPatch: this.setPatch
      patches: [],
      selectedPatch: null,
      setSelectedPatch: this.setSelectedPatch
    }

    // this.setPatch = (payload) => {
    //   this.setState((state) => {
    //     const patch = state.patch
    //     Object.assign(patch, payload)
    //     console.log('setting new patch to ', patch)
    //     return { patch }
    //   })
    // }

    // this.setSelectedPatch = (patch) => {
    //   this.setState({ selectedPatch: patch })
    // }

    // import static set data
    importSetData()
  }

  componentDidMount () {
    this.fetchPatches()
  }

  async fetchPatches () {
    const { data } = await http.get('patches', false)
    console.log('data from get patches: ', data)
    this.setState({ patches: data })

    // preselect latest patch
    if (data.length) {
      this.handlePatchSelected(data[0])
    }
  }

  handlePatchSelected (patchObj) {
    this.setState({ selectedPatch: patchObj })
    http.setPatch(patchObj.patch)
  }

  render () {
    const { routes, patches, selectedPatch } = this.state
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
              {/* <PatchContext.Provider value={this.state}>
                <Suspense fallback={<div>Loading Patch ...</div>}>
                  <PatchSelector />
                </Suspense>
              </PatchContext.Provider> */}
              <Suspense fallback={<div>Loading Patch ...</div>}>
                <PatchSelector
                  patches={patches}
                  selectedPatch={selectedPatch}
                  onSelected={(patch) => this.handlePatchSelected(patch)}
                />
              </Suspense>
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
