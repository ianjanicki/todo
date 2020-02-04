import React from 'react';
import SortableTree from 'react-sortable-tree';

import theme from '../style/react-sortable-tree/index';
import { db } from '../firebase';

const Tree = ({ todos, listId }) => {
  console.log(todos);
  return (
    <div style={{ height: 400, overflowX: 'hidden', overflowY: 'auto' }}>
      <SortableTree
        treeData={todos}
        onChange={treeData =>
          db
            .collection('lists')
            .doc(listId)
            .update({
              todos: treeData
            })
        }
        theme={theme}
        generateNodeProps={rowInfo => ({
          buttons: (
            <i className="material-icons" style={{ fontSize: 18 }}>
              more_vert
            </i>
          ),
          icons: (
            <i className="material-icons" style={{ fontSize: 18 }}>
              drag_indicator
            </i>
          ),
          title: (
            <>
              <i
                className="material-icons"
                style={{ color: '#1890FF', fontSize: 18, marginRight: 6 }}
              >
                link
              </i>
              <span>{rowInfo.node.title}</span>
            </>
          )
        })}
      />
    </div>
  );
};

export default Tree;
