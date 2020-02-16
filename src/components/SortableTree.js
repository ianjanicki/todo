import React, { useState } from 'react';
import SortableTreeComponent from 'react-sortable-tree';
import { InputBase } from '@material-ui/core';

import theme from '../style/react-sortable-tree/index';

const SortableTree = () => {
  const [treeData, setTreeData] = useState([
    {
      title: '.gitignore',
      expanded: true,
      completed: false
    },
    { title: 'package.json', expanded: true, completed: false },
    {
      title: 'src',
      children: [
        { title: 'styles.css', expanded: true, completed: false },
        { title: 'index.js', expanded: true, completed: false },
        { title: 'reducers.js', expanded: true, completed: false },
        { title: 'actions.js', expanded: true, completed: false },
        { title: 'utils.js', expanded: true, completed: false }
      ],
      expanded: true,
      completed: false
    },
    {
      title: 'tmp',
      children: [
        { title: '12214124-log', expanded: true, completed: false },
        { title: 'drag-disabled-file', expanded: true, completed: false }
      ],
      expanded: true,
      completed: false
    },
    {
      title: 'build',
      children: [
        { title: 'react-sortable-tree.js', expanded: true, completed: false }
      ],
      expanded: true,
      completed: false
    },
    {
      title: 'public',
      expanded: true,
      completed: false
    },
    {
      title: 'node_modules',
      expanded: true,
      completed: false
    }
  ]);

  const createInput = title => (
    <div>
      <InputBase
        value={title}
        // {...(todo.completed && { className: classes.completedText })}
        // autoFocus={focusIndex === index}
        // onChange={event => updateTodo(index, { title: event.target.value })}
        // onKeyDown={event => handleInput(event, index)}
      />
    </div>
  );

  const insertInput = tree => {
    const scanChildren = child => ({
      ...child,
      title: createInput(child.title),
      ...(child.children && {
        children: child.children.map(child => scanChildren(child))
      })
    });
    return tree.map(child => scanChildren(child));
  };

  const updateTreeData = treeData => setTreeData(treeData);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
        <SortableTreeComponent
          theme={theme}
          treeData={insertInput(treeData)}
          onChange={updateTreeData}
        />
      </div>
    </div>
  );
};

export default SortableTree;
