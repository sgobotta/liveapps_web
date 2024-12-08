import { Tile, TileAsset } from '../types';

export interface TileI {
  reveal: (tile: Tile) => Tile;
  hide: (tile: Tile) => Tile;
  init: (tile: TileAsset, index: number) => Tile;
  showTileEffects: (tileElement: any) => void;
  hideTileEffects: (tileElement: any) => void;
}
