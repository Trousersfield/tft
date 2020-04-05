import React, { Suspense } from 'react'
import './App.css'
/// import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Routes from './routes'
import { importSetData } from './util/setDataImporter'

const App = () => {
  // import static set data
  importSetData()
  const routes = Routes.routes

  return (
    <Router>
      <div>
        <nav>
          <div className="flex justify-start">
            {routes.map((route) =>
              <TopMenuItem key={'menu-item-' + route.path}
                {...route}
              />
            )}
          </div>
        </nav>

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
    </Router>
  )
}

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes = {route.routes} />
      )}
    />
  )
}

const TopMenuItem = (item) => {
  return (
    <div className="p-2">
      <Link to={item.path || ''}>
        {item.name}
      </Link>
    </div>
  )
}

export default App
