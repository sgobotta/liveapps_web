import React, { BaseSyntheticEvent } from 'react';
import Card from './Card';
import { CardI, Card as CardT, Deck as DeckT } from '../../types';

type BoardProps = {
  deck: DeckT;
  elementKeyFunction: (i: number) => string;
  onCardClick: (
    deck: DeckT,
  ) => (
    e: BaseSyntheticEvent,
    cardId: string,
    cardAPI: CardI,
  ) => Promise<BaseSyntheticEvent>;
};

export default function Board({
  deck,
  elementKeyFunction,
  onCardClick,
}: BoardProps): React.ReactElement {
  return (
    <div
      className="
      m-auto sm:w-1/2 align-middle
      absolute
      top-1/2 sm:left-1/2
      transform sm:-translate-x-1/2 -translate-y-1/2

      grid
      gap-0 grow
      grid-rows-6 grid-cols-6
    "
    >
      {deck.cards.map(({ id, asset, state }: CardT, index: number) => (
        <Card
          onClick={onCardClick(deck)}
          key={elementKeyFunction(index)}
          id={id}
          index={index}
          asset={asset}
          state={state}
        />
      ))}
    </div>
  );
}
