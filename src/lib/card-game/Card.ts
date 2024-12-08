import { v4 } from 'uuid';
import { TileAsset as TileAssetT } from '../../types';
import { Card as CardT } from '../../types';

export enum CardState {
  Hidden,
  Visible,
}

interface CardI {
  reveal: (card: CardT) => CardT;
  hide: (card: CardT) => CardT;
  init: (tile: TileAssetT, index: number) => CardT;
}

function init(asset: TileAssetT, index: number): CardT {
  return {
    asset,
    id: v4(),
    index,
    state: CardState.Hidden,
  };
}

export default function Card(): CardI {
  function reveal(card: CardT): CardT {
    return { ...card, state: CardState.Visible };
  }

  function hide(card: CardT): CardT {
    return { ...card, state: CardState.Hidden };
  }

  return {
    init,
    reveal,
    hide,
  };
}
