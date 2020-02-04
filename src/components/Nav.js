import React from 'react';
import { Grid, Avatar, Button, Typography } from '@material-ui/core';
import { navigate } from '@reach/router';

import { firebase, db } from '../firebase';
import Lists from './Lists';

export default function Nav({ user, lists, location, darkTheme, handleMode }) {
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
      .then(res => {
        db.collection('users')
          .doc(user.uid)
          .update({
            listOrder: [res.id, ...lists.map(list => list.id)]
          });
        navigate(`/list/${res.id}`);
      });
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
          <Lists lists={lists} user={user} location={location} />
        </Grid>
      </Grid>
    </Grid>
  );
}
