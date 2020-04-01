import React from 'react';
import { AuthContext } from '../context/auth';

const Admin = (props) => {
    const [state, setState] = React.useContext(AuthContext);
    return (
        <div>
            <h1>Admin Page</h1>
            {state.user ? (
                <h2>Hello User</h2>
            ) : (
                <h2>WTF?</h2>
            )}
        </div>
    )
}

export default Admin;