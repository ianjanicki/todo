import React from 'react';
import { List as MuiList } from '@material-ui/core';

import Todo from './Todo';
// import SortableTree from './SortableTree';
import { db } from '../firebase';

const Todos = ({ todos, listId }) => {
  const createTodo = (index, selectionStart, currentValue) => {
    return db
      .collection('lists')
      .doc(listId)
      .update({
        focus: index + 1,
        todos: [
          ...todos.slice(0, index),
          {
            title: currentValue.substring(0, selectionStart),
            completed: false
            // expanded: true
          },
          {
            title: currentValue.substring(selectionStart),
            completed: false
            // expanded: true
          },
          ...todos.slice(index + 1, todos.length + 1)
        ]
      });
  };

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

  // const handleInput = (event, index) => {
  //   if (event.key === 'Enter') {
  //     return createTodo(index, event.target.selectionStart, event.target.value);
  //   }
  //   if (
  //     (index !== 0 || todos.length > 1) &&
  //     event.key === 'Backspace' &&
  //     event.target.selectionStart === 0
  //   ) {
  //     return deleteTodo(index);
  //   }
  // };

  const deleteTodo = index => {
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

  return (
    <MuiList dense>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          index={index}
          // handleInput={handleInput}
          updateTodo={updateTodo}
          // setRef={setRef}
        />
      ))}
    </MuiList>
  );
};

export default Todos;
