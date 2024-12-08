import { shuffleArray } from '../../utils';
import {
  Card as CardT,
  CardI,
  CardState,
  Deck as DeckT,
  TileAsset as TileAssetT,
  DeckI,
} from '../../types';
import { BaseSyntheticEvent } from 'react';
import { useCard } from './useCard';

export const useDeck = (): DeckI => {
  const { hide: hideCard, init: initCard, reveal: revealCard } = useCard();

  // ---------------------------------------------------------------------------
  // Internal API
  //

  function _cardsSet(cards: CardT[]): CardT[] {
    return Array.from(cards).filter(
      (member: CardT, index: number, self: CardT[]) =>
        self.findIndex((m) => m.id === member.id) === index,
    );
  }

  function _revealSelectedCard(cards: CardT[], card: CardT): CardT[] {
    return cards.map((_card: CardT) =>
      _card.id === card.id ? revealCard(_card) : _card,
    );
  }

  function _hideAllCards(deck: DeckT): DeckT {
    return { ...deck, cards: deck.cards.map((card: CardT) => hideCard(card)) };
  }

  function _hideAllCardsExcept(deck: DeckT, card: CardT): DeckT {
    return {
      ...deck,
      cards: [
        ...deck.cards
          .filter((_card: CardT) => _card.id !== card.id)
          .map((card: CardT) => hideCard(card)),
        card,
      ],
    };
  }

  function _guessCardEffect(deck: DeckT, card: CardT): DeckT {
    return {
      ...deck,
      ..._hideAllCardsExcept(deck, card),
      afterEffect: null,
    };
  }

  function _missCardEffect(deck: DeckT): DeckT {
    return {
      ...deck,
      ..._hideAllCards(deck),
      afterEffect: null,
    };
  }

  // ---------------------------------------------------------------------------
  // Exportable API
  //

  function init(tiles: TileAssetT[]): DeckT {
    return {
      cards: (shuffleArray(tiles.concat(tiles)) as unknown as TileAssetT[]).map(
        (tile: TileAssetT, index: number) => initCard(tile, index),
      ),
      selectedCards: [],
    };
  }

  function findCard(deck: DeckT, cardId: string): CardT | undefined {
    return deck.cards.find((card: CardT) => card.id === cardId);
  }

  async function processCard(
    e: BaseSyntheticEvent,
    card: CardT,
    deck: DeckT,
    cardAPI: CardI,
  ): Promise<DeckT> {
    let _deck = { ...deck, cards: _revealSelectedCard(deck.cards, card) };

    const { selectedCards } = _deck;

    switch (card.state) {
      case CardState.Hidden:
        cardAPI.showCardEffects(e.target.parentNode);
        break;

      case CardState.Visible:
        break;
    }

    switch (selectedCards.length) {
      case 0:
        console.log('no selected cards: ', selectedCards);
        const cards = deck.cards.map((_card: CardT) => {
          if (_card.id === card.id) {
            if (card.state === CardState.Hidden) {
              cardAPI.showCardEffects(e.target.parentNode);
              return { ...card, state: CardState.Visible };
            } else {
              cardAPI.hideCardEffects(e.target.parentNode);
              return { ...card, state: CardState.Hidden };
            }
          } else {
            return _card;
          }
        });
        _deck = { ..._deck, cards, selectedCards: [card] };
        break;

      case 1:
        const _selectedCards = _cardsSet([...selectedCards, card]);
        console.log('one selected card: ', _selectedCards);

        // Guessed the card
        if (_selectedCards.length === 1) {
          console.log('Guesses card: ', card);
          _deck = {
            ..._deck,
            selectedCards: [],
            afterEffect: _guessCardEffect(_deck, card),
          };
        }
        // Did not guessed the card
        if (_selectedCards.length === 2) {
          console.log('Did not guessed the card: ', card);
          // cardApi.showCard(e.target.parentNode)
          _deck = {
            ..._deck,
            selectedCards: [],
            afterEffect: _missCardEffect(_deck),
          };
        }
        break;

      case 2:
        console.log('two selected cards ', selectedCards);
        break;
    }

    return _deck;
  }

  return {
    init,
    findCard,
    processCard,
  };
};
