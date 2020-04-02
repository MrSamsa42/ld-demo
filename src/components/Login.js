import React from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../context/auth';


const Login = (props) => {
    const [state, setState] = React.useContext(AuthContext);
    const [redirect, setRedirect] = React.useState(false);

    const [tempUser, setTempUser] = React.useState({})
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [incomplete, setIncomplete] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    const getAuthenticatedUser = async () => {
        try{
          await Auth.currentAuthenticatedUser();
          setRedirect(true);
        } catch (error) {
            if(error !== "not authenticated") {
                alert(error);
            }
        }
    };
    
      React.useEffect( () => {
        console.log("hello from Login's useEffect")
        getAuthenticatedUser(); 
      }, []);

    if(redirect) {
        return (
            <Redirect to='/' push={true} />
        )
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const user = await Auth.signIn({username: email, password: password});
            if(!user.challengeName) {
                //only set the user object if user profile is complete.  Don't redirect -- useEffect above handles that
                setState({...state, user: user, isLoggedIn: true});
                setRedirect(true);
            } else if(user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                setTempUser(user)
                setIncomplete(true);
            } else { //any other user challenge
                setErrorMessage("There is something wrong with your user profile.  Please contact support services.");
            }
        } catch (error) {
            console.log("Error signing in...")
            console.log(error);
            setErrorMessage(error.message)
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const loggedUser = await Auth.completeNewPassword(
                tempUser, // Cognito User Object
                newPassword,    
                //required attributes...
                {
                    name: firstName,
                    family_name: lastName
                }
            );
            setState({...state, user: loggedUser, isLoggedIn: true})
            setRedirect(true);
            console.log("Update worked!");
        } catch(error) {
            console.log("ERROR UPDATING....");
            console.log(error);
        }
    }

    if(!incomplete) {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={e => setEmail(e.target.value)} required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required />

                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
                </form>
            </div>
        );
    }else {
        return (
            <div className="container">
                <form className="form-signin" onSubmit={handleUpdate}>
                    <h1 className="h3 mb-3 font-weight-normal">Please update the following info:</h1>
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input type="text" id="firstName" className="form-control" placeholder="First Name" onChange={e => setFirstName(e.target.value)} required autoFocus />
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input type="text" id="lastName" className="form-control" placeholder="Last Name" onChange={e => setLastName(e.target.value)} required />
                    <label htmlFor="updatePassword" className="sr-only">New Password</label>
                    <input type="password" id="updatePassword" className="form-control" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} required />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
                </form>
            </div>
        );
    }
}

export default Login;