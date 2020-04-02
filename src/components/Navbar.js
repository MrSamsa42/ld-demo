
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

const Navbar = (props) => {
    const [state, setState] = React.useContext(AuthContext);
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light ml-2 mr-2">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Reports <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Courier Pickup
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="">Request Pickup</a>
                            <a className="dropdown-item" href="">Pickup History</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Test Orders
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="">Order Tests</a>
                            <a className="dropdown-item" href="">Test Order History</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Supply Orders
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="">Order Supplies</a>
                            <a className="dropdown-item" href="">Supply Order History</a>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li className="nav-item">
                        <a href="" className="nav-link" onClick={() => handleLogout()}><span className="d-none d-sm-inline d-xl-block px-1">Log Out</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
        