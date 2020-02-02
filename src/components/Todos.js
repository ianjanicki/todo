import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles(() => ({
  listItem: {
    '&:hover $dragContainer': {
      opacity: 1
    }
  },
  dragContainer: {
    opacity: 0
  }
}));

export default function Todos({ todos, handleToggle }) {
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
              onChange={() => handleToggle(index, todo.completed)}
            />
          </ListItemIcon>
          <ListItemText primary={todo.text} />
        </ListItem>
      ))}
    </List>
  );
}
