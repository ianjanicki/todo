import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { Router } from '@reach/router';

import { firebase, db } from './firebase';
import useCollection from './hooks/useCollection';
import List from './components/List';
import Login from './components/Login';
import Nav from './components/Nav';

function App() {
  const user = useAuth();
  const lists = useCollection('lists');

  return (
    <CssBaseline>
      {user ? (
        <Grid container>
          <Grid item xs={2}>
            <Nav user={user} lists={lists} />
          </Grid>
          <Grid item xs={10}>
            <Router>
              <List path="list/:listId" user={user} />
              {/* <Redirect from="/" to="channel/general" noThrow /> */}
            </Router>
          </Grid>
        </Grid>
      ) : (
        <Login />
      )}
    </CssBaseline>
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
          uid: firebaseUser.uid
        };
        setUser(user);

        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });

        // setupPresense(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

export default App;
