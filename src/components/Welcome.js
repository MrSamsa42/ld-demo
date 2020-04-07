import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

async function stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}

const fakeAccounts = [
    {
        id: 1,
        name: "Clinic A",
        repName: "Johnny Faker",
        repPhone: "111-111-1111",
        repEmail: "jfaker@fake.com"
    },
    {
        id: 2,
        name: "Clinic B",
        repName: "Steve Notreal",
        repPhone: "222-222-2222",
        repEmail: "snotreal@fake.com"
    },
    {
        id: 3,
        name: "Clinic C",
        repName: "Amy Alias",
        repPhone: "333-333-3333",
        repEmail: "aalias@fake.com"
    }
]
const defaultAccount = fakeAccounts[0];

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

    return (
        <div>
            <header className="jumbotron jumbotron-fluid bg-info text-white">
                <div className="container">
                    <h1 className="display-4">Welcome to LD-Demo{name ? ", " + name : "..." }</h1>
                    <p className="lead">You are currently acting on behalf of the Account, <strong>XXXXXXXX</strong>. If you are affiliated with more than one Account, you may change Accounts at any time by selecting from the drop-down menu in the navigation bar above.</p>
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
                        {/* <div>
                            <strong>{state.currentAccount && state.currentAccount.name}</strong>
                            <br />{state.currentAccount && state.currentAccount.repName}
                            <br />
                        </div>
                        <address>
                            <abbr title="Phone">P:</abbr>
                            {state.currentAccount && state.currentAccount.repPhone}
                            <br />
                            <abbr title="Email">E:</abbr>
                            <a href="mailto:#">{state.currentAccount && state.currentAccount.repPhone}</a>
                        </address> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;