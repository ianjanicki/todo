import React from 'react';
import { Grid, Avatar, Button, Typography } from '@material-ui/core';

import { firebase } from '../firebase';
import Lists from './Lists';

export default function Nav({ user, lists }) {
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
          <Button size="small" fullWidth>
            New List
          </Button>
        </Grid>
        <Grid item>
          <Lists lists={lists} />
        </Grid>
      </Grid>
    </Grid>
  );
}
