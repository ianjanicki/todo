import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputBase } from '@material-ui/core';
import Hotkeys from 'react-hot-keys';

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

  const createTodo = (index, selectionStart, currentValue) =>
    db
      .collection('lists')
      .doc(listId)
      .update({
        focus: index + 1,
        todos: [
          ...todos.slice(0, index),
          {
            text: currentValue.substring(0, selectionStart),
            completed: false
          },
          {
            text: currentValue.substring(selectionStart),
            completed: false
          },
          ...todos.slice(index + 1, todos.length + 1)
        ]
      });

  const updateTitle = title =>
    db
      .collection('lists')
      .doc(listId)
      .update({ title });

  const updateTodo = (index, todo) => {
    db.collection('lists')
      .doc(listId)
      .update({
        todos: [
          ...todos.slice(0, index),
          {
            ...todos[index],
            ...todo
          },
          ...todos.slice(index + 1, todos.length)
        ]
      });
  };

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
        <Todos todos={todos} updateTodo={updateTodo} createTodo={createTodo} />
      </Grid>
    </Grid>
  );
}
