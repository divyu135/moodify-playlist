import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

class SignOut extends Component {
    // constructor(props){
    //     super(props);
    //   }

      render() {
    
        return (
            <Redirect   to={{
                pathname: "/home",
                state: { authenticated: false, username: '' }
              }} />
        );
      }
}

export default SignOut;