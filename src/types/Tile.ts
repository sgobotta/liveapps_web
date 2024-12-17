import { BaseSyntheticEvent } from 'react';
import { TileAsset } from './TileAsset';
import { TileI } from '../interfaces/Tile';

export enum TileState {
  Hidden,
  Selected,
  Matched,
}

export type Tile = {
  asset: TileAsset;
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
