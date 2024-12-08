import { v4 } from 'uuid';
import { Tile, TileState, TileAsset } from '../../types';
import { TileI } from '../../interfaces';

export const useTile = (): TileI => {
  function showTileEffects(tileElement: any): void {
    tileElement.classList.replace('grayscale', '!grayscale-0');
  }

  function hideTileEffects(tileElement: any): void {
    tileElement.classList.replace('!grayscale-0', 'grayscale');
  }

  function hide(tile: Tile): Tile {
    return { ...tile, state: TileState.Hidden };
  }

  function init(asset: TileAsset, index: number): Tile {
    return {
      asset,
      id: v4(),
      index,
      state: TileState.Hidden,
    };
  }

  function reveal(tile: Tile): Tile {
    return { ...tile, state: TileState.Visible };
  }

  return {
    hide,
    hideTileEffects: hideTileEffects,
    init,
    reveal,
    showTileEffects: showTileEffects,
  };
};
