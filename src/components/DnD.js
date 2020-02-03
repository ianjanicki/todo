import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import update from 'immutability-helper';

import Card from './Card';

const Container = ({ lists }) => {
  const [cards, setCards] = useState([
    {
      createdAt: 'Timestamp',
      title: 'Foo',
      todos: [],
      user: 'DocumentReference',
      id: '1JOZWJXykypHEQcUu7yg'
    },
    {
      createdAt: 'Timestamp',
      title: 'Bar',
      todos: [],
      user: 'DocumentReference',
      id: 'MUMoFW6lbkS4N5db4S55'
    }
  ]);
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      console.log(dragIndex, hoverIndex);
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [cards]
  );
  const renderCard = (card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.title}
        moveCard={moveCard}
      />
    );
  };
  return (
    <List dense component="nav">
      {cards.map((card, i) => renderCard(card, i))}
    </List>
  );
};
export default Container;
