import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from "./Welcome";
import Reports from "./Reports";
import Navbar from "./Navbar";
import RequestPickup from "./RequestPickup";
import PickupHistory from "./PickupHistory";
import OrderTests from "./OrderTests";
import TestOrderHistory from "./TestOrderHistory";
import OrderSupplies from "./OrderSupplies";
import SupplyOrderHistory from "./SupplyOrderHistory";

export class InternalApp extends Component {

    render() {
        if (this.props.authState === "signedIn") {
            return (
                <>
                    <Router>
                    <Navbar />
                        <Switch>
                            <Route exact path="/" component={Welcome} />
                            <Route path="/reports" component={Reports} />
                            <Route path="/request-pickup" component={RequestPickup} />
                            <Route path="/pickup-history" component={PickupHistory} />
                            <Route path="/order-tests" component={OrderTests} />
                            <Route path="/test-order-history" component={TestOrderHistory} />
                            <Route path="/order-supplies" component={OrderSupplies} />
                            <Route path="/supply-order-history" component={SupplyOrderHistory} />
                        </Switch>
                    </Router>
                </>
            );
        } else {
            return null;
        }
    }
}