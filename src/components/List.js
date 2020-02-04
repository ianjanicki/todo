import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputBase, List as MuiList } from '@material-ui/core';
// import { useHotkeys } from 'react-hotkeys-hook';

import SortableTree from './SortableTree';
import useDoc from '../hooks/useDoc';
import Todo from './Todo';
import { db } from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10)
  },
  title: {
    marginLeft: theme.spacing(7),
    fontSize: '2rem',
    fontWeight: 500
  }
}));

export default function List({ listId }) {
  const { title = '', todos = [] } = useDoc(`lists/${listId}`);
  const classes = useStyles();
  // const [focusIndex, setFocusIndex] = useState(0);

  // useHotkeys('up', () => setFocusIndex(focusIndex !== 0 && focusIndex - 1));
  // useHotkeys('down', () =>
  //   setFocusIndex(focusIndex !== todos.length && focusIndex + 1)
  // );

  const handleInput = (event, index) => {
    if (event.key === 'Enter') {
      return createTodo(index, event.target.selectionStart, event.target.value);
    }
    if (
      (index !== 0 || todos.length > 1) &&
      event.key === 'Backspace' &&
      event.target.selectionStart === 0
    ) {
      return deleteTodo(index);
    }
  };

  const createTodo = (index, selectionStart, currentValue) => {
    // setFocusIndex(index + 1);
    return db
      .collection('lists')
      .doc(listId)
      .update({
        focus: index + 1,
        todos: [
          ...todos.slice(0, index),
          {
            title: currentValue.substring(0, selectionStart),
            completed: false,
            expanded: true
          },
          {
            title: currentValue.substring(selectionStart),
            completed: false,
            expanded: true
          },
          ...todos.slice(index + 1, todos.length + 1)
        ]
      });
  };

  const deleteTodo = index => {
    // setFocusIndex(index - 1);
    return db
      .collection('lists')
      .doc(listId)
      .update({
        todos: [
          ...todos.slice(0, index),
          ...todos.slice(index + 1, todos.length)
        ]
      });
  };

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
          autoFocus
          value={title}
          onChange={event => updateTitle(event.target.value)}
          className={classes.title}
          placeholder="Untitled"
        />
      </Grid>
      <Grid item>
        {/* <MuiList dense>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              index={index}
              handleInput={handleInput}
              updateTodo={updateTodo}
              // focusIndex={focusIndex}
            />
          ))}
        </MuiList> */}
        <SortableTree todos={todos} listId={listId} />
      </Grid>
    </Grid>
  );
}
