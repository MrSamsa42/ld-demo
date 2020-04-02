import React from 'react';
import { AuthContext } from '../context/auth';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

const Welcome = (props) => {
    const [state, setState] = React.useContext(AuthContext);
    console.log(state);

    return (
        <div>
           <Navbar />
            <div className="container mt-4">
                <h2>Welcome, {state.user.attributes.name}!</h2>
            </div>
        </div>
    )
}

export default Welcome;