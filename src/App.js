import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';

Amplify.configure(awsconfig);

function App() {
  const [state, setState] = React.useState({});

  React.useEffect( () => {
    const getAuthenticatedUser = async () => {
      let user = null;
      try{
        user = await Auth.currentAuthenticatedUser({
          bypassCache: false  // If set to true, this call will send a request to Cognito to get the latest user data
        });
        console.log("Authenticated user is...");
        console.log(user);
        setState({user})
      } catch (error) {
        console.log(error);
      }
    };
    getAuthenticatedUser(); 
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            {/* <PrivateRoute path="/admin" component={Admin} /> */}
          </Switch>
      </Router>
    </AuthContext.Provider>
  )
}


export default App;
