import { v4 } from 'uuid';
import { TileAssetT } from './TileAsset';
import { BaseSyntheticEvent } from 'react';
import { CardApiType } from '../../components/card_game/Card';

export enum CardState {
  Hidden,
  Visible,
}

export type t = {
  asset: TileAssetT;
  state: CardState;
  id: string;
  index: number;
  // onDragStart: (e: React.DragEvent<HTMLDivElement>) => boolean;
  // onDrop: (e: React.DragEvent<HTMLDivElement>) => boolean;
  onClick?: (
    e: BaseSyntheticEvent,
    cardId: string,
    cardApi: CardApiType,
  ) => Promise<BaseSyntheticEvent>;
};

interface CardI {
  reveal: (card: t) => t;
  hide: (card: t) => t;
  init: (tile: TileAssetT, index: number) => t;
}

function init(asset: TileAssetT, index: number): t {
  return {
    asset,
    id: v4(),
    index,
    state: CardState.Hidden,
  };
}

export default function Card(): CardI {
  function reveal(card: t): t {
    return { ...card, state: CardState.Visible };
  }

  function hide(card: t): t {
    return { ...card, state: CardState.Hidden };
  }

  return {
    init,
    reveal,
    hide,
  };
}
