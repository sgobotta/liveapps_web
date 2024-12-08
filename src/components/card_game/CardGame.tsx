import Board from './Board';
import { Deck as DeckT } from '../../types';
import { useTileGame } from '../../hooks/tile-game/useCardGame';
import { TileGame as CardGameT, TileGameProps } from '../../types/CardGame';
import { ReactElement } from 'react';

export default function CardGame({ tiles }: TileGameProps): ReactElement {
  const { getDeck, onTileClick: onCardClick }: CardGameT = useTileGame(tiles);

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
