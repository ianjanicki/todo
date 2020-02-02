import React from 'react';
import { Grid } from '@material-ui/core';
import { Router, Redirect } from '@reach/router';

import useCollection from '../hooks/useCollection';
import List from './List';
import Nav from './Nav';

const TodoApp = ({ user, location }) => {
  const lists = useCollection('lists', undefined, ['user', '==', user.userRef]);

  return (
    <Grid container>
      <Grid item xs={2}>
        <Nav user={user} lists={lists} location={location} />
      </Grid>
      <Grid item xs={10}>
        <Router>
          <List path="list/:listId" user={user} />
          {lists.length > 0 && (
            <Redirect from="/" to={`list/${lists[0].id}`} noThrow />
          )}
        </Router>
      </Grid>
    </Grid>
  );
};

export default TodoApp;
