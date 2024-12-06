import React, { BaseSyntheticEvent } from 'react';
import Card, { t as CardProps, CardApiType } from './Card'
import { t as DeckProps } from './Deck';

type BoardProps = {
  deck: DeckProps;
  elementKeyFunction: (i: number) => string;
  onCardClick: (deck: DeckProps) => (e: BaseSyntheticEvent, cardId: string, cardApi: CardApiType) => BaseSyntheticEvent;
}

export default function Board({ deck, elementKeyFunction, onCardClick }: BoardProps) : React.ReactElement {
  return (
    <div className="
      m-auto sm:w-1/2 align-middle
      absolute
      top-1/2 sm:left-1/2
      transform sm:-translate-x-1/2 -translate-y-1/2

      grid
      gap-0 grow
      grid-rows-6 grid-cols-6
    ">
      {deck.cards.map(({ id, imagePath, onDragStart, onDrop, state }: CardProps, index: number) => (
        <Card
          onClick={onCardClick(deck)} 
          onDragStart={onDragStart}
          onDrop={onDrop} 
          key={elementKeyFunction(index)}
          id={id}
          index={index}
          imagePath={imagePath}
          state={state}
        />
      ))}
    </div>
  )
}
