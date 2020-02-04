import React from 'react';
import { Grid, Avatar, Button, Typography } from '@material-ui/core';
import { navigate } from '@reach/router';

import { firebase, db } from '../firebase';
// import Lists from './Lists';
import DnD from './DnD';

export default function Nav({ user, lists, location }) {
  const createList = () => {
    db.collection('lists')
      .add({
        title: '',
        createdAt: new Date(),
        user: user.userRef,
        todos: [
          {
            text: '',
            completed: false
          }
        ]
      })
      .then(res => navigate(`/list/${res.id}`));
  };

  return (
    <Grid container>
      <Grid item container alignItems="center">
        <Grid item>
          <Avatar alt={user.displayName} src={user.photoUrl} />
        </Grid>
        <Grid item>
          <Typography>{user.displayName}</Typography>
          <Button
            size="small"
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <Button size="small" fullWidth onClick={createList}>
            New List
          </Button>
        </Grid>
        <Grid item>
          <DnD lists={lists} user={user} />
          {/* <Lists lists={lists} location={location} uid={user.uid} /> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
