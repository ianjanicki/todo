import React from 'react';
import { Grid } from '@material-ui/core';
import { Router, Redirect } from '@reach/router';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import useCollection from '../hooks/useCollection';
import List from './List';
import Nav from './Nav';

const TodoApp = ({ user, location }) => {
  const lists = useCollection('lists', undefined, ['user', '==', user.userRef]);
  return (
    <DndProvider backend={Backend}>
      <Grid container>
        <Grid item xs={2}>
          <Nav user={user} lists={lists} location={location} />
        </Grid>
        <Grid item xs={10}>
          <Router>
            <List path="list/:listId" user={user} />
            {user.listOrder && user.listOrder.length && lists.length > 0 && (
              <Redirect from="/" to={`list/${lists[0].id}`} noThrow />
            )}
          </Router>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default TodoApp;
