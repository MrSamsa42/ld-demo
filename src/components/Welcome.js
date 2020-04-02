import React from 'react';
import { AuthContext } from '../context/auth';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

const Welcome = (props) => {
    const [state, setState] = React.useContext(AuthContext);
    console.log(state);

    let account = "Dummy Account X";
    let repName = "Joe Salesman";
    let repPhone = "555-555-5555";
    let repEmail = "rep@fake.com"

    return (
        <div>
            <Navbar />
            <header className="jumbotron jumbotron-fluid bg-info text-white">
                <div className="container">
                    <h1 className="display-4">Welcome to LD-Demo, {state.user.attributes.name}!</h1>
                    <p className="lead">You are currently acting on behalf of the Account, <strong>{account}</strong>. If you are affiliated with more than one Account, you may change Accounts at any time by selecting from the drop-down menu in the navigation bar above.</p>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mb-5">
                        <h2 className="h3">About LabDox</h2>
                        <hr />
                        <p>LabDox is a portal for customers of <em>Some Fake Company</em>. Here you can do things like order supplies, request courier pickups, order tests, or view reports, depending on the privilages assigned to you by your Retention Representative. </p>
                        <p>If you encounter any problems with the site, or to request expanded access, contact your Retention Representative.  </p>

                    </div>
                    <div className="col-md-4 mb-5">
                        <h2 className="h3">Retention Rep</h2>
                        <hr />
                        <div>
                            <strong>{account}</strong>
                            <br />{repName}
                            <br />
                        </div>
                        <address>
                            <abbr title="Phone">P:</abbr>
                            {repPhone}
                            <br />
                            <abbr title="Email">E:</abbr>
                            <a href="mailto:#">{repEmail}</a>
                        </address>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;