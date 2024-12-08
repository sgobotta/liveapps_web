import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Deck } from '../../components/card_game/Deck';
import {
  CardI,
  Card as CardT,
  Deck as DeckT,
  CardGame as CardGameT,
  TileAsset as TileAssetT,
} from '../../types';

export const useCardGame = (tiles: TileAssetT[]): CardGameT => {
  const deck = Deck().init(tiles);
  const [getDeck, setDeck] = useState<DeckT>(deck);

  async function processCard(
    e: BaseSyntheticEvent,
    card: CardT,
    deck: DeckT,
    cardAPI: CardI,
  ): Promise<DeckT> {
    return await Deck().processCard(e, card, deck, cardAPI);
  }

  function findCard(deck: DeckT, cardId: string): CardT | undefined {
    return deck.cards.find((card: CardT) => card.id === cardId);
  }

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
