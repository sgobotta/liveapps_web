import Board from './Board';
import { Deck as DeckT } from '../../types';
import { useTileGame } from '../../hooks/tile-game/useTileGame';
import { TileGame as TileGameT, TileGameProps } from '../../types/TileGame';
import { ReactElement } from 'react';

export default function TileGame({ tiles }: TileGameProps): ReactElement {
  const { getDeck, onTileClick }: TileGameT = useTileGame(tiles);

  function elementKey(index: number) {
    return `tile-${index}`;
  }

  function renderDeck(deck: DeckT) {
    return (
      <Board
        deck={deck}
        elementKeyFunction={elementKey}
        onTileClick={onTileClick}
      />
    );
  }

  return renderDeck(getDeck);
}
