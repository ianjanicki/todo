import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  InputBase,
  Checkbox
} from '@material-ui/core';
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

export default function Todos({ todos, updateTodo, createTodo }) {
  const classes = useStyles();

  return (
    <List dense>
      {todos.map((todo, index) => (
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
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              onChange={() => updateTodo(index, { completed: !todo.completed })}
            />
          </ListItemIcon>
          <InputBase
            value={todo.text}
            {...(todo.completed && { className: classes.completedText })}
            onChange={event => updateTodo(index, { text: event.target.value })}
            onKeyDown={event =>
              event.key === 'Enter' &&
              createTodo(index, event.target.selectionStart, event.target.value)
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
