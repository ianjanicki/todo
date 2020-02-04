import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(() => ({
  listItemContainer: {
    '&:hover $menuContainer': {
      opacity: 1
    }
  },
  listItem: {
    opacity: 0.5
  },
  menuContainer: {
    opacity: 0
  }
}));

const ListItem = ({
  id,
  text,
  index,
  moveCard,
  updateOrder,
  currentLocation,
  deleteList
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => updateOrder(),
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

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = id => {
    deleteList(id);
    handleClose();
  };

  drag(drop(ref));
  return (
    <>
      <MuiListItem
        ref={ref}
        selected={currentLocation === id}
        button
        disableRipple
        disableTouchRipple
        {...(isDragging && { className: classes.listItem })}
        ContainerProps={{ className: classes.listItemContainer }}
        onClick={() => navigate(`/list/${id}`)}
      >
        <ListItemText primary={text === '' ? 'Untitled' : text} />
        <ListItemSecondaryAction
          className={classes.menuContainer}
          onClick={handleClick}
        >
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </MuiListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleDelete(id)} dense>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
export default ListItem;
