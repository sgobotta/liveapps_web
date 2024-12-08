import Board from './Board';
import { Deck } from '../../types';
import { useTileGame } from '../../hooks/tile-game/useTileGame';
import { TileGame, TileGameProps } from '../../types/TileGame';
import { ReactElement } from 'react';

export default function TileGameComponent({
  tiles,
}: TileGameProps): ReactElement {
  const { getDeck, onTileClick }: TileGame = useTileGame(tiles);

  function elementKey(index: number) {
    return `tile-${index}`;
  }

  function renderDeck(deck: Deck) {
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
