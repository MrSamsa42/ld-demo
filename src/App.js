import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Admin from './components/Admin';
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
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
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
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  )
}


export default App;
