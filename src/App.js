import React, { Suspense } from 'react';
import './App.css'
/// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Combs = React.lazy(() => import('./views/Combs'))
const Items = React.lazy(() => import('./views/Items'))

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="bg-grey">
            <li>
              <Link to="/">Combs</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/items">
              <Items />
            </Route>
            <Route path="/">
              <Combs />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
