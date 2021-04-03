import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Search from './Components/Search'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import SignOut from './Components/SignOut'
import Moods from './Components/Moods'
import Playlist from './Components/Playlist'


function App() {
  return (
      <main >
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/moods" component={Moods} />
              <Route path="/playlist" component={Playlist} />
              <Route path="/search" component={Search} />
              <Route path="/sign_up" component={SignUp} />
              <Route path="/sign_in" component={SignIn} />
              <Route path="/sign_out" component={SignOut} />
          </Switch>
      </main>
  )
}
export default App;
