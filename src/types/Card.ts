import { BaseSyntheticEvent } from 'react';
import { TileAsset as TileAssetT } from './TileAsset';

export type CardAPI = {
  showCard: (cardElement: any) => void;
  hideCard: (cardElement: any) => void;
};

export enum CardState {
  Hidden,
  Visible,
}

export type Card = {
  asset: TileAssetT;
  state: CardState;
  id: string;
  index: number;
  // onDragStart: (e: React.DragEvent<HTMLDivElement>) => boolean;
  // onDrop: (e: React.DragEvent<HTMLDivElement>) => boolean;
  onClick?: (
    e: BaseSyntheticEvent,
    cardId: string,
    cardApi: CardAPI,
  ) => Promise<BaseSyntheticEvent>;
};
