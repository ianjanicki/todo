import React, { useState, useEffect, useCallback } from 'react';
import List from '@material-ui/core/List';
import update from 'immutability-helper';
import _ from 'lodash';

import ListItem from './ListItem';
import { db } from '../firebase';

const Container = ({ lists, user }) => {
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    var sortedLists = _.sortBy(lists, function(list) {
      return user.listOrder.indexOf(list.id);
    });
    setListItems(sortedLists);
  }, [user.listOrder, lists]);

  const updateOrder = () => {
    const listOrder = listItems.map(item => item.id);
    db.collection('users')
      .doc(user.uid)
      .update({
        listOrder
      });
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = listItems[dragIndex];
      setListItems(
        update(listItems, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [listItems]
  );
  const renderListItem = (item, index) => {
    return (
      <ListItem
        key={item.id}
        index={index}
        id={item.id}
        text={item.title}
        moveCard={moveCard}
        updateOrder={updateOrder}
      />
    );
  };
  return (
    <List dense component="nav">
      {listItems.map((item, i) => renderListItem(item, i))}
    </List>
  );
};
export default Container;
