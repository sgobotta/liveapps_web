import React, { BaseSyntheticEvent, ReactElement } from 'react';
import TileComponent from './Tile';
import { Tile, Deck, TileScoreboard } from '../../types';
import { TileI } from '../../interfaces';
import { useDeck } from '../../hooks/tile-game/useDeck';
import GameStats from './GameStats';

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
  scoreboard: TileScoreboard;
};

export default function BoardComponent({
  deck,
  elementKeyFunction,
  onTileClick,
  scoreboard,
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
        sm:w-full md:w-3/4 lg:w-4/6 xl:w-2/4 2xl:w-2/4
        m-auto
        absolute
        top-1/2 sm:left-1/2
        transform sm:-translate-x-1/2 -translate-y-1/2
      `}
      >
        <GameStats scoreboard={scoreboard} />
        <div>
          <div
            className={`
              p-4 sm:p-12 md:p-12 lg:p-12
              align-middle
              grid
              gap-0 aspect-square
              grid-rows-6 grid-cols-6
              ${extraClasses.join(', ')}
            `}
          >
            {_renderTiles(deck.tiles)}
          </div>
        </div>
      </div>
    );
  }

  return _renderTilesContainer(deck, isBlocked(deck) ? ['cursor-none'] : []);
}
