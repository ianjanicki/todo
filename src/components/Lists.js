import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from '@reach/router';

export default function Lists({ lists }) {
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {lists.map(list => (
        <Link key={list.id} to={`/list/${list.id}`}>
          <ListItem button>
            <ListItemText primary={list.title} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
