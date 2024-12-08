import Board from './Board';
import { Deck as DeckT } from '../../types';
import { useCardGame } from '../../hooks/tile-game/useCardGame';
import { CardGame as CardGameT, CardGameProps } from '../../types/CardGame';
import { ReactElement } from 'react';

export default function CardGame({ tiles }: CardGameProps): ReactElement {
  const { getDeck, onCardClick }: CardGameT = useCardGame(tiles);

  function elementKey(index: number) {
    return `card-${index}`;
  }

  function renderDeck(deck: DeckT) {
    return (
      <Board
        deck={deck}
        elementKeyFunction={elementKey}
        onCardClick={onCardClick}
      />
    );
  }

  return renderDeck(getDeck);
}
