import { BaseSyntheticEvent } from 'react';
import { TileAsset as TileAssetT } from './TileAsset';

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
    cardAPI: CardI,
  ) => Promise<BaseSyntheticEvent>;
};

export interface CardI {
  reveal: (card: Card) => Card;
  hide: (card: Card) => Card;
  init: (tile: TileAssetT, index: number) => Card;
  showCardEffects: (cardElement: any) => void;
  hideCardEffects: (cardElement: any) => void;
}
