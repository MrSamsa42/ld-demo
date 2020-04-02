import React from 'react';
import { AuthContext } from '../context/auth';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

const Welcome = (props) => {
    const [state, setState] = React.useContext(AuthContext);
    console.log(state);

    //TODO: move this bit to a nav bar
    if(!state.user) {
        return (
            <Redirect to='/login' push={true} />
        )
    }
    async function handleLogout() {
        await Auth.signOut();
        setState({...state, user: null});
    }

    return (
        <div>
           
            <div className="container mt-4">
                <h2>Welcome, {state.user.attributes.name}!</h2>
                <button type="button" className="btn btn-primary" onClick={() => handleLogout()}>Log Out</button>
            </div>
        </div>
    )
}

export default Welcome;