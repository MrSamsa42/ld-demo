import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { connect} from 'react-redux';

async function stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}

const Welcome = (props) => {
    const [name, setName] = useState("");

    React.useEffect(() => {
        console.log("hello from Welcome's useEffect")
        const getAuthenticatedUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setName(user.attributes.name);
            } catch (error) {
                console.log(error);
            }
        };
        getAuthenticatedUser();
    }, []);
    ;

    console.log(props);
    return (
        <div>
            <header className="jumbotron jumbotron-fluid bg-info text-white">
                <div className="container">
                    <h1 className="display-4">Welcome to LD-Demo{name ? ", " + name : "..." }</h1>
                    <p className="lead">You are currently acting on behalf of the Account, <strong>{props.currentAccount.name}</strong>. If you are affiliated with more than one Account, you may change Accounts at any time by selecting from the drop-down menu in the navigation bar above.</p>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mb-5">
                        <h2 className="h3">About LD-Demo</h2>
                        <hr />
                        <p>LD-Demo is a portal for customers of <em>Some Fake Company</em>. Here you can do things like order supplies, request courier pickups, order tests, or view reports, depending on the privilages assigned to you by your Retention Representative. </p>
                        <p>If you encounter any problems with the site, or to request expanded access, contact your Retention Representative.  </p>

                    </div>
                    <div className="col-md-4 mb-5">
                        <h2 className="h3">Retention Rep</h2>
                        <hr />
                        <div>
                            <strong>{props.currentAccount && props.currentAccount.name}</strong>
                            <br />{props.currentAccount && props.currentAccount.repName}
                            <br />
                        </div>
                        <address>
                            <abbr title="Phone">P:</abbr>
                            {props.currentAccount && props.currentAccount.repPhone}
                            <br />
                            <abbr title="Email">E:</abbr>
                            <a href="mailto:#">{props.currentAccount && props.currentAccount.repPhone}</a>
                        </address>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        accounts: state.account.accounts,
        currentAccount: state.account.currentAccount
    }
}

export default connect(mapStateToProps)(Welcome);