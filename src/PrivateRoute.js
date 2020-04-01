import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

function PrivateRoute( { component: Component, ...rest } ) {
    const [state] = useAuth();
    console.log(state.user)

    return (
        <Route 
        {...rest} 
        render={(props) => 
            state.user ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )}
        />
    );
}

export default PrivateRoute;