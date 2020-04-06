import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from "./Welcome";
import Reports from "./Reports";
import Navbar from "./Navbar";

export class InternalApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.authState === "signedIn") {
            return (
                <>
                    <Router>
                    <Navbar />
                        <Switch>
                            <Route exact path="/" component={Welcome} />
                            <Route path="/reports" component={Reports} />
                        </Switch>
                    </Router>
                </>
            );
        } else {
            return null;
        }
    }
}