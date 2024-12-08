import { BaseSyntheticEvent } from 'react';
import { TileAsset as TileAssetT } from './TileAsset';

export enum TileState {
  Hidden,
  Visible,
}

export type Tile = {
  asset: TileAssetT;
  state: TileState;
  id: string;
  index: number;
  // onDragStart: (e: React.DragEvent<HTMLDivElement>) => boolean;
  // onDrop: (e: React.DragEvent<HTMLDivElement>) => boolean;
  onClick?: (
    e: BaseSyntheticEvent,
    tileId: string,
    tileAPI: TileI,
  ) => Promise<BaseSyntheticEvent>;
};

export interface TileI {
  reveal: (tile: Tile) => Tile;
  hide: (tile: Tile) => Tile;
  init: (tile: TileAssetT, index: number) => Tile;
  showTileEffects: (tileElement: any) => void;
  hideTileEffects: (tileElement: any) => void;
}
