import React, { Component } from 'react';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import MaterialUITheme from '../style/react-sortable-tree/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFocusIndex: 0,
      searchFoundCount: null,
      searchString: '',
      treeData: [
        { title: '.gitignore' },
        { title: 'package.json' },
        { type: 'divider' },
        {
          children: [
            { title: 'styles.css' },
            { title: 'index.js' },
            { title: 'reducers.js' },
            { title: 'actions.js' },
            { title: 'utils.js' }
          ],
          expanded: true,
          isDirectory: true,
          title: 'src'
        },
        {
          children: [
            { title: '12214124-log' },
            { dragDisabled: true, title: 'drag-disabled-file' }
          ],
          isDirectory: true,
          title: 'tmp'
        },
        {
          children: [{ title: 'react-sortable-tree.js' }],
          isDirectory: true,
          title: 'build'
        },
        {
          isDirectory: true,
          title: 'public'
        },
        {
          isDirectory: true,
          title: 'node_modules'
        }
      ]
    };

    this._handleUpdateTreeData = this._handleUpdateTreeData.bind(this);
    this._handleExpandAll = this._handleExpandAll.bind(this);
    this._handleCollapseAll = this._handleCollapseAll.bind(this);
  }

  _handleUpdateTreeData(treeData) {
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        expanded,
        treeData: this.state.treeData
      })
    });
  }

  _handleExpandAll() {
    this.expand(true);
  }

  _handleCollapseAll() {
    this.expand(false);
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount
    } = this.state;

    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n   ');

      global.alert(
        'Info passed to the icon and button generators:\n\n' +
          `node: {\n   ${objectString}\n},\n` +
          `path: [${path.join(', ')}],\n` +
          `treeIndex: ${treeIndex}`
      );
    };

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0
      });

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
          <h3>File Explorer Theme</h3>
          <button onClick={this._handleExpandAll}>Expand All</button>
          <button onClick={this._handleCollapseAll}>Collapse All</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <form
            onSubmit={event => {
              event.preventDefault();
            }}
            style={{ display: 'inline-block' }}
          >
            <label htmlFor="find-box">
              Search:&nbsp;
              <input
                id="find-box"
                onChange={event =>
                  this.setState({ searchString: event.target.value })
                }
                type="text"
                value={searchString}
              />
            </label>

            <button
              disabled={!searchFoundCount}
              onClick={selectPrevMatch}
              type="button"
            >
              &lt;
            </button>

            <button
              disabled={!searchFoundCount}
              onClick={selectNextMatch}
              type="submit"
            >
              &gt;
            </button>

            <span>
              &nbsp;
              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
              &nbsp;/&nbsp;
              {searchFoundCount || 0}
            </span>
          </form>
        </div>

        <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
          <SortableTree
            canDrag={({ node }) => !node.dragDisabled}
            canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
            generateNodeProps={rowInfo => ({
              buttons: [
                <button
                  key={rowInfo.node._id}
                  onClick={() => alertNodeInfo(rowInfo)}
                  style={{
                    backgroundColor: 'gray',
                    border: 0,
                    borderRadius: '100%',
                    color: 'white',
                    fontWeight: 100,
                    height: 16,
                    padding: 0,
                    width: 16
                  }}
                >
                  i
                </button>
              ],
              icons: rowInfo.node.isDirectory
                ? [
                    <div
                      key={rowInfo.node._id}
                      style={{
                        borderBottom: 'solid 10px gray',
                        borderColor: rowInfo.node.expanded ? 'white' : 'gray',
                        borderLeft: 'solid 8px gray',
                        boxSizing: 'border-box',
                        filter: rowInfo.node.expanded
                          ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                          : 'none',
                        height: 12,
                        marginRight: 10,
                        width: 16
                      }}
                    />
                  ]
                : [
                    <div
                      key={rowInfo.node._id}
                      style={{
                        border: 'solid 1px black',
                        fontSize: 8,
                        height: 16,
                        marginRight: 10,
                        textAlign: 'center',
                        width: 12
                      }}
                    >
                      F
                    </div>
                  ]
            })}
            onChange={this._handleUpdateTreeData}
            searchFinishCallback={matches =>
              this.setState({
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
                searchFoundCount: matches.length
              })
            }
            searchFocusOffset={searchFocusIndex}
            searchQuery={searchString}
            theme={MaterialUITheme}
            treeData={treeData}
          />
        </div>
      </div>
    );
  }
}

export default App;
