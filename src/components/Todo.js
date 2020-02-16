import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, InputBase, Checkbox } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0
    // '&:hover $dragContainer': {
    //   opacity: 1
    // }
  },
  dragContainer: {
    opacity: 0
  },
  completedText: {
    textDecoration: 'line-through'
  }
}));

export default function Todos({
  todo,
  index,
  updateTodo,
  handleInput,
  setRef
}) {
  const classes = useStyles();

  // const handleFocus = () => inputRef.current.children[0].focus();

  return (
    <ListItem
      key={index}
      className={classes.listItem}
      ContainerProps={{ className: classes.listItem }}
    >
      <ListItemIcon className={classes.dragContainer}>
        <DragIndicatorIcon />
      </ListItemIcon>
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          onChange={() => updateTodo(index, { completed: !todo.completed })}
        />
      </ListItemIcon>
      <InputBase
        inputRef={setRef}
        value={todo.title}
        {...(todo.completed && { className: classes.completedText })}
        onChange={event => updateTodo(index, { title: event.target.value })}
        // onKeyDown={event => handleInput(event, index)}
      />
    </ListItem>
  );
}
