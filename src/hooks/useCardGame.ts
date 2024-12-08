import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { t as CardT } from '../lib/card-game/Card';
import { CardApiType } from '../components/card_game/Card';
import { Deck } from '../components/card_game/Deck';
import { Deck as DeckT, CardGame as CardGameT } from '../types';
import { TileAsset as TileAssetT } from '../types/TileAsset';

export const useCardGame = (tiles: TileAssetT[]): CardGameT => {
  const deck = Deck().init(tiles);
  const [getDeck, setDeck] = useState<DeckT>(deck);

  async function processCard(
    e: BaseSyntheticEvent,
    card: CardT,
    deck: DeckT,
    cardApi: CardApiType,
  ): Promise<DeckT> {
    return await Deck().processCard(e, card, deck, cardApi);
  }

  function findCard(deck: DeckT, cardId: string): CardT | undefined {
    return deck.cards.find((card: CardT) => card.id === cardId);
  }

  const onCardClick =
    (deck: DeckT) =>
    async (
      e: BaseSyntheticEvent,
      cardId: string,
      cardApi: CardApiType,
    ): Promise<BaseSyntheticEvent> => {
      e.preventDefault();
      const card: CardT | undefined = findCard(deck, cardId);
      const updatedDeck = await processCard(e, card!, deck, cardApi);

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
