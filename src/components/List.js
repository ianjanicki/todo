import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputBase } from '@material-ui/core';

import useDoc from '../hooks/useDoc';
import Todos from './Todos';
import { db } from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10)
  },
  title: {
    marginLeft: theme.spacing(9),
    fontSize: '2rem',
    fontWeight: 500
  }
}));

export default function List({ listId }) {
  const { title = '', todos = [] } = useDoc(`lists/${listId}`);
  const classes = useStyles();

  const handleToggle = (index, completed) => {
    db.collection('lists')
      .doc(listId)
      .update({
        todos: [
          ...todos.slice(0, index),
          {
            ...todos[index],
            completed: !completed
          },
          ...todos.slice(index + 1, todos.length)
        ]
      });
  };

  const updateTitle = title =>
    db
      .collection('lists')
      .doc(listId)
      .update({ title });

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <InputBase
          value={title}
          onChange={event => updateTitle(event.target.value)}
          className={classes.title}
        />
      </Grid>
      <Grid item>
        <Todos todos={todos} handleToggle={handleToggle} />
      </Grid>
    </Grid>
  );
}
