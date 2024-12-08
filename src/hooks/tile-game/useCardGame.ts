import { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
  CardI,
  Card as CardT,
  Deck as DeckT,
  CardGame as CardGameT,
  TileAsset as TileAssetT,
} from '../../types';
import { useDeck } from './useDeck';

export const useCardGame = (tiles: TileAssetT[]): CardGameT => {
  const { init: initDeck, findCard, processCard } = useDeck();

  const deck = initDeck(tiles);
  const [getDeck, setDeck] = useState<DeckT>(deck);

  const onCardClick =
    (deck: DeckT) =>
    async (
      e: BaseSyntheticEvent,
      cardId: string,
      cardAPI: CardI,
    ): Promise<BaseSyntheticEvent> => {
      e.preventDefault();
      const card: CardT | undefined = findCard(deck, cardId);
      const updatedDeck = await processCard(e, card!, deck, cardAPI);

      setDeck(updatedDeck);

      return e;
    };

  useEffect(() => {
    setDeck(deck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles]);

  useEffect(() => {
    if (getDeck.afterEffect) {
      console.log('doing some after effect...');
      setDeck({ ...getDeck, afterEffect: null });

      new Promise((resolve) => {
        setTimeout(() => {
          return resolve(getDeck.afterEffect);
        }, 2000);
      }).then((updatedDeck) => {
        setDeck(updatedDeck as DeckT);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDeck.afterEffect]);

  return { getDeck, setDeck, onCardClick };
};
