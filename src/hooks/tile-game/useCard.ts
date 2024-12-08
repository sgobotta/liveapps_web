import { CardI } from '../../types';

export const useCard = (): CardI => {
  return {
    showCard: (cardElement: any) => {
      cardElement.classList.replace('grayscale', '!grayscale-0');
    },
    hideCard: (cardElement: any) => {
      cardElement.classList.replace('!grayscale-0', 'grayscale');
    },
  };
};
