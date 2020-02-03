import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {
  ListItem,
  // ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
  // Menu,
  // MenuItem
} from '@material-ui/core';
// import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(() => ({
  listItem: {
    padding: 0,
    '&:hover $menuContainer': {
      opacity: 1
    }
  },
  menuContainer: {
    opacity: 0
  }
}));

const Card = ({ id, text, index, moveCard }) => {
  const classes = useStyles();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <ListItem
      ref={ref}
      style={{ opacity }}
      // selected={list.id === currentLocation}
      button
      disableRipple
      disableTouchRipple
      ContainerProps={{ className: classes.listItem }}
      // onClick={() => navigate(`/list/${list.id}`)}
    >
      <ListItemText
        // primary={list.title === '' ? 'Untitled' : list.title}
        primary={text}
      />
      <ListItemSecondaryAction
        className={classes.menuContainer}
        // onClick={handleClick}
      >
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default Card;
