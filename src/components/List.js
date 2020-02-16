import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputBase } from '@material-ui/core';

import { useHotkeys } from '../hooks/useHotkeys';
import useDoc from '../hooks/useDoc';
import Todos from './Todos';
import { db } from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10)
  },
  title: {
    marginLeft: theme.spacing(6),
    fontSize: '2rem',
    fontWeight: 700
  }
}));

export default function List({ listId }) {
  // const [cursorPosition, setCursorPosition] = useState(0);
  // const [inputRefs, setInputRefs] = useState([]);
  let { title = '', todos = [] } = useDoc(`lists/${listId}`);
  const classes = useStyles();

  // useEffect(
  //   () =>
  //     console.log(
  //       inputRefs,
  //       inputRefs.findIndex(input => input === document.activeElement)
  //     ),
  //   [cursorPosition, inputRefs]
  // );

  // const setRef = ref => {
  //   console.log('setRef', ref);
  //   inputRefs.push(ref);
  // };

  const updateTitle = title =>
    db
      .collection('lists')
      .doc(listId)
      .update({ title });

  // useHotkeys('up', () => setCursorPosition(prevPosition => prevPosition + 1));
  // useHotkeys('down', () => setCursorPosition(prevPosition => prevPosition - 1));

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <InputBase
          // inputRef={ref => ref && setRef(ref)}
          value={title}
          onChange={event => updateTitle(event.target.value)}
          className={classes.title}
          placeholder="Untitled"
        />
      </Grid>
      <Grid item>
        <Todos
          todos={todos}
          listId={listId}
          // setRef={setRef}
        />
      </Grid>
    </Grid>
  );
}
