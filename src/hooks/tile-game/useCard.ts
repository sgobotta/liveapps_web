import { v4 } from 'uuid';
import { Card, CardI, CardState, TileAsset } from '../../types';

export const useCard = (): CardI => {
  function showCardEffects(cardElement: any): void {
    cardElement.classList.replace('grayscale', '!grayscale-0');
  }

  function hideCardEffects(cardElement: any): void {
    cardElement.classList.replace('!grayscale-0', 'grayscale');
  }

  function hide(card: Card): Card {
    return { ...card, state: CardState.Hidden };
  }

  function init(asset: TileAsset, index: number): Card {
    return {
      asset,
      id: v4(),
      index,
      state: CardState.Hidden,
    };
  }

  function reveal(card: Card): Card {
    return { ...card, state: CardState.Visible };
  }

  return {
    hide,
    hideCardEffects,
    init,
    reveal,
    showCardEffects,
  };
};
