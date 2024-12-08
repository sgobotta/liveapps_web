import React, { BaseSyntheticEvent } from 'react';
import TileComponent from './Tile';
import { Tile, Deck } from '../../types';
import { TileI } from '../../interfaces';

type BoardProps = {
  deck: Deck;
  elementKeyFunction: (i: number) => string;
  onTileClick: (
    deck: Deck,
  ) => (
    e: BaseSyntheticEvent,
    tileId: string,
    tileAPI: TileI,
  ) => Promise<BaseSyntheticEvent>;
};

export default function BoardComponent({
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
      {deck.tiles.map(({ id, asset, state }: Tile, index: number) => (
        <TileComponent
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
