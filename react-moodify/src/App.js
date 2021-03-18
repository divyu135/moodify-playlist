import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Search from './Components/Search'


function App() {
  return (
      <main>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/search" component={Search} />
          </Switch>
      </main>
  )
}
export default App;
