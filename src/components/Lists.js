import React from 'react';
import {
  List,
  ListItem,
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
import _ from 'lodash';

import { db } from '../firebase';
import useDoc from '../hooks/useDoc';

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

function Lists({ lists, location, uid }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentLocation = location.pathname.replace('/list/', '');
  const { listOrder } = useDoc(`/users/${uid}`);

  var sortedLists = _.sortBy(lists, function(list) {
    return listOrder.indexOf(list.id);
  });

  const deleteList = id => {
    db.collection('lists')
      .doc(id)
      .delete();
    navigate(`/list/${lists[0].id}`);
    handleClose();
  };

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {sortedLists.map(list => (
        <div key={list.id}>
          <ListItem
            selected={list.id === currentLocation}
            button
            ContainerProps={{ className: classes.listItem }}
            onClick={() => navigate(`/list/${list.id}`)}
          >
            <ListItemText
              primary={list.title === '' ? 'Untitled' : list.title}
            />
            <ListItemSecondaryAction
              className={classes.menuContainer}
              onClick={handleClick}
            >
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => deleteList(list.id)} dense>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </div>
      ))}
    </List>
  );
}

export default Lists;
