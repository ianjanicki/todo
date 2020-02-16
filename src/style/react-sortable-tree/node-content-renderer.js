import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, InputBase } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import makeStyles from '@material-ui/styles/makeStyles';
import stylesNode from './node-content-renderer-style.js';

const useStyles = makeStyles(stylesNode, { name: 'MuiNodeContent' });

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some(
      child => child === younger || isDescendant(child, younger)
    )
  );
}

function FileThemeNodeContentRenderer(props) {
  const {
    scaffoldBlockPxWidth,
    connectDragPreview,
    connectDragSource,
    isDragging,
    canDrop,
    node,
    title,
    draggedNode,
    treeIndex,
    className,
    style,
    didDrop,
    lowerSiblingCounts,
    listIndex,
    swapFrom,
    swapLength,
    swapDepth
  } = props;

  const classes = useStyles();

  const nodeTitle = title || node.title;

  const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
  const isLandingPadActive = !didDrop && isDragging;

  // Construct the scaffold representing the structure of the tree
  const scaffold = [];

  lowerSiblingCounts.forEach((lowerSiblingCount, i) => {
    if (i > 0) {
      scaffold.push(
        <div
          className={classes.lineBlock}
          key={`pre_${1 + i}`}
          style={{ width: scaffoldBlockPxWidth }}
        />
      );

      if (treeIndex !== listIndex && i === swapDepth) {
        // This row has been shifted, and is at the depth of
        // the line pointing to the new destination
        let highlightLineClass = '';

        if (listIndex === swapFrom + swapLength - 1)
          // This block is on the bottom (target) line
          // This block points at the target block (where the row will go when released)
          highlightLineClass = classes.highlightBottomLeftCorner;
        else if (treeIndex === swapFrom)
          // This block is on the top (source) line
          highlightLineClass = classes.highlightTopLeftCorner;
        // This block is between the bottom and top
        else highlightLineClass = classes.highlightLineVertical;

        scaffold.push(
          <div
            className={`${classes.absoluteLineBlock} ${highlightLineClass}`}
            key={`highlight_${1 + i}`}
            style={{
              left: scaffoldBlockPxWidth * i,
              width: scaffoldBlockPxWidth
            }}
          />
        );
      }
    }
  });

  let handle = (
    <div>
      <DragIndicatorIcon className={classes.dragContainer} />
    </div>
  );

  handle = connectDragSource(handle, { dropEffect: 'copy' });

  const toggleCheckbox = () => {
    console.log(node);
    node.completed = !node.completed;
    console.log(node);
  };

  return (
    <div className={classes.contentNode}>
      {connectDragPreview(
        <div
          className={
            classes.row +
            (node.active ? ` ${classes.activeRow}` : '') +
            (isLandingPadActive ? ` ${classes.rowLandingPad}` : '') +
            (isDragging ? ` ${classes.rowLandingPadDisable}` : '') +
            (isLandingPadActive && !canDrop ? ` ${classes.rowCancelPad}` : '') +
            (className ? ` ${className}` : '')
          }
          style={{
            opacity: isDraggedDescendant ? 0.5 : 1,
            ...style
          }}
        >
          <Fragment>
            {scaffold}
            <div className={classes.rowIcon}>
              {handle}
              <Checkbox
                color="primary"
                checked={node.completed}
                disableRipple
                onChange={toggleCheckbox}
              />
            </div>
            <div className={classes.rowLabel}>
              <span className={classes.rowTitle}>{nodeTitle}</span>
              {/* <InputBase
                value={nodeTitle}
                // {...(todo.completed && { className: classes.completedText })}
                // autoFocus={focusIndex === index}
                // onChange={event => updateTodo(index, { title: event.target.value })}
                // onKeyDown={event => handleInput(event, index)}
              /> */}
            </div>
          </Fragment>
        </div>
      )}
    </div>
  );
}

FileThemeNodeContentRenderer.defaultProps = {
  buttons: null,
  canDrag: false,
  canDrop: false,
  className: '',
  draggedNode: null,
  icons: null,
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null
};

FileThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.node,
  canDrag: PropTypes.bool,
  canDrop: PropTypes.bool,
  className: PropTypes.string,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  icons: PropTypes.node,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  listIndex: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  node: PropTypes.shape({}).isRequired,
  parentNode: PropTypes.shape({}),
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  rowDirection: PropTypes.string.isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,

  // Drag and drop API functions
  // Drag source
  style: PropTypes.shape({}),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func, // Needed for dndManager
  // Drop target
  treeId: PropTypes.string.isRequired,
  treeIndex: PropTypes.number.isRequired
};

export default FileThemeNodeContentRenderer;
