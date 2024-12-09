import { v4 } from 'uuid';
import { Tile, TileState, TileAsset } from '../../types';
import { TileI } from '../../interfaces';
import { useTileAsset } from './useTileAsset';

export const useTile = (): TileI => {
  const { equal: equalTileAssets } = useTileAsset();

  function equal(
    { asset: tileAssetA }: Tile,
    { asset: tileAssetB }: Tile,
  ): boolean {
    return equalTileAssets(tileAssetA, tileAssetB);
  }

  function hasBeenMatched({ state }: Tile) {
    return state === TileState.Matched;
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

  function match(tile: Tile) {
    return { ...tile, state: TileState.Matched };
  }

  function reveal(tile: Tile): Tile {
    return { ...tile, state: TileState.Selected };
  }

  function showTileEffects(tileElement: any): void {
    tileElement.classList.replace('grayscale', '!grayscale-0');
  }

  return {
    equal,
    hasBeenMatched,
    hide,
    hideTileEffects,
    init,
    match,
    reveal,
    showTileEffects,
  };
};
