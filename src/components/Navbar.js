
import React from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';

const Navbar = (props) => {

    async function handleLogout() {
        await Auth.signOut();
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
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/reports">Reports <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="/#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Courier Pickup
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/request-pickup">Request Pickup</Link>
                            <Link className="dropdown-item" to="/pickup-history">Pickup History</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="/#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Test Orders
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/order-tests">Order Tests</Link>
                            <Link className="dropdown-item" to="test-order-history">Test Order History</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a href="/#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            Supply Orders
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/order-supplies">Order Supplies</Link>
                            <Link className="dropdown-item" to="/supply-order-history">Supply Order History</Link>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li>
                        <form className="form-inline">
                            <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </form>

                    </li>
                    <li className="nav-item">
                        <a href="/#" role="button" className="nav-link" onClick={() => handleLogout()}><span className="d-none d-sm-inline d-xl-block px-1">Log Out</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
