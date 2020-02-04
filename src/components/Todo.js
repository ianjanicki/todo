import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, InputBase, Checkbox } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
    '&:hover $dragContainer': {
      opacity: 1
    }
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
  handleInput
  // focusIndex
}) {
  const classes = useStyles();

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
        value={todo.text}
        {...(todo.completed && { className: classes.completedText })}
        // autoFocus={focusIndex === index}
        onChange={event => updateTodo(index, { text: event.target.value })}
        onKeyDown={event => handleInput(event, index)}
      />
    </ListItem>
  );
}
