import Board from './Board';
import { Deck } from '../../types';
import { useTileGame } from '../../hooks/tile-game/useTileGame';
import { TileGame, TileGameProps } from '../../types/TileGame';
import { ReactElement } from 'react';

export default function TileGameComponent({
  tiles,
}: TileGameProps): ReactElement {
  const { getDeck, onTileClick, scoreboard }: TileGame = useTileGame(tiles);

  function elementKey(index: number) {
    return `tile-${index}`;
  }

  console.log(getDeck);

  function renderDeck(deck: Deck) {
    return (
      <Board
        deck={deck}
        elementKeyFunction={elementKey}
        onTileClick={onTileClick}
        scoreboard={scoreboard}
      />
    );
  }

  return renderDeck(getDeck);
}
