import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Location } from '@reach/router';

import { firebase, db } from './firebase';
import theme from './style/theme';
import TodoApp from './components/TodoApp';
import Login from './components/Login';

function App() {
  const user = useAuth();

  return (
    <Location>
      {({ location }) => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {user ? <TodoApp location={location} user={user} /> : <Login />}
        </ThemeProvider>
      )}
    </Location>
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
          userRef: db.collection('users').doc(firebaseUser.uid)
        };
        setUser(user);
        const { userRef, ...userRest } = user;

        db.collection('users')
          .doc(user.uid)
          .set(userRest, { merge: true });

        // setupPresense(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

export default App;
