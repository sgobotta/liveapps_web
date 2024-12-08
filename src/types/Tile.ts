import { BaseSyntheticEvent } from 'react';
import { TileAsset as TileAssetT } from './TileAsset';
import { TileI } from '../interfaces/Tile';

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
