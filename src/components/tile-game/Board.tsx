import React, { BaseSyntheticEvent } from 'react';
import Tile from './Tile';
import { TileI, Tile as TileT, Deck as DeckT } from '../../types';

type BoardProps = {
  deck: DeckT;
  elementKeyFunction: (i: number) => string;
  onTileClick: (
    deck: DeckT,
  ) => (
    e: BaseSyntheticEvent,
    tileId: string,
    tileAPI: TileI,
  ) => Promise<BaseSyntheticEvent>;
};

export default function Board({
  deck,
  elementKeyFunction,
  onTileClick,
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
      {deck.tiles.map(({ id, asset, state }: TileT, index: number) => (
        <Tile
          onClick={onTileClick(deck)}
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
