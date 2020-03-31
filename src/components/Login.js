import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        Auth.signIn({
            username: email,
            password: password
        })
        .then( (resp) => console.log(resp) )
        .catch( (err) => console.log(err))
    }

    return (
        <div className="container">
            <form className="form-signin">
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={e => setEmail(e.target.value)} required autofocus />
                <label for="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        </div>
    );
}

export default Login;