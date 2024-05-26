import React from 'react';
import TodoHome from './component/TodoHome';
import { Descope, useSession, useUser } from '@descope/react-sdk';

function App() {
    const { isAuthenticated, isSessionLoading } = useSession()
    const { isUserLoading } = useUser()

    return <div>
        {!isAuthenticated && (
        <Descope
            flowId="sign-up-or-in"
            onSuccess={() => console.log('Logged in!')}
            onError={() => console.log('Could not log in!')}
        />
        )}

        {(isSessionLoading || isUserLoading) && <p>Loading...</p>}

        {!isUserLoading && isAuthenticated && (<TodoHome />)}
    </div>;
}

export default App;