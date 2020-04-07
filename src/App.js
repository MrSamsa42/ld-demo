import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from 'aws-amplify-react';
import AuthWrapper from './components/AuthWrapper';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
          <AuthWrapper />
        </Authenticator>
      </header>
    </div>
  )
}

export default App;
