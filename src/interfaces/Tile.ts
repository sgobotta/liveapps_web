import { Tile, TileAsset } from '../types';

export interface TileI {
  equal: (tileA: Tile, tileB: Tile) => boolean;
  reveal: (tile: Tile) => Tile;
  match: (tile: Tile) => Tile;
  hasBeenMatched: (tile: Tile) => boolean;
  hide: (tile: Tile) => Tile;
  init: (tile: TileAsset, index: number) => Tile;
  showTileEffects: (tileElement: any) => void;
  hideTileEffects: (tileElement: any) => void;
}
