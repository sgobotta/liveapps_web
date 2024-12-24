import React, { BaseSyntheticEvent, ReactElement } from 'react';
import TileComponent from './Tile';
import { Tile, Deck } from '../../types';
import { TileI } from '../../interfaces';
import { useDeck } from '../../hooks/tile-game/useDeck';

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
  const { isBlocked } = useDeck();

  function _renderTiles(tiles: Tile[]): ReactElement[] {
    return tiles.map(({ id, asset, state }: Tile, index: number) => (
      <TileComponent
        onClick={onTileClick(deck)}
        key={elementKeyFunction(index)}
        id={id}
        index={index}
        asset={asset}
        state={state}
      />
    ));
  }

  function _renderTilesContainer(
    deck: Deck,
    extraClasses: string[] = [],
  ): ReactElement {
    return (
      <div
        className={`
          m-auto sm:w-full md:w-full lg:w-full xl:w-3/4 2xl:w-2/4
          sm:p-24 md:p-24 lg:p-24 align-middle
          absolute
          top-1/2 sm:left-1/2
          transform sm:-translate-x-1/2 -translate-y-1/2
          grid
          gap-0 aspect-square
          grid-rows-6 grid-cols-6
          ${extraClasses.join(', ')}
        `}
      >
        {_renderTiles(deck.tiles)}
      </div>
    );
  }

  return _renderTilesContainer(deck, isBlocked(deck) ? ['cursor-none'] : []);
}
