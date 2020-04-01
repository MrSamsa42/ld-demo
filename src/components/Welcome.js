import React from 'react';
import { AuthContext } from '../context/auth';
import { Auth } from 'aws-amplify';

const Welcome = (props) => {
    const [state, setState] = React.useContext(AuthContext);

    async function handleLogout() {
        await Auth.signOut();
      
        setState({...state, user: null});
      
        props.history.push("/login");
      }

    return (
        <div className="container mt-4">
            <h2>Welcome, {state.user && state.user.attributes.name}!</h2>
            <button type="button" className="btn btn-primary" onClick={() => handleLogout()}>Log Out</button>
        </div>
    )
}

export default Welcome;