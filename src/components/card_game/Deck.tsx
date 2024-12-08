import { BaseSyntheticEvent } from 'react';
import { CardApiType } from './Card';
import Card, { CardState, t as CardT } from '../../lib/card-game/Card';
import { TileAssetT } from '../../lib/card-game/TileAsset';
import { shuffleArray } from '../../utils';

export type t = {
  cards: CardT[];
  selectedCards: CardT[];
  afterEffect?: t | null;
};

function init(tiles: TileAssetT[]): t {
  return {
    cards: (shuffleArray(tiles.concat(tiles)) as unknown as TileAssetT[]).map(
      (tile: TileAssetT, index: number) => Card().init(tile, index),
    ),
    selectedCards: [],
  };
}

function cardsSet(cards: CardT[]): CardT[] {
  return Array.from(cards).filter(
    (member: CardT, index: number, self: CardT[]) =>
      self.findIndex((m) => m.id === member.id) === index,
  );
}

function revealCard(card: CardT): CardT {
  return { ...card, state: CardState.Visible };
}

function hideCard(card: CardT): CardT {
  return { ...card, state: CardState.Hidden };
}

function hideAllCards(deck: t): t {
  return { ...deck, cards: deck.cards.map((card: CardT) => hideCard(card)) };
}

function hideAllCardsExcept(deck: t, card: CardT): t {
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

function guessCardEffect(deck: t, card: CardT): t {
  return {
    ...deck,
    ...hideAllCardsExcept(deck, card),
    afterEffect: null,
  };
}

function missCardEffect(deck: t): t {
  return {
    ...deck,
    ...hideAllCards(deck),
    afterEffect: null,
  };
}

function revealSelectedCard(cards: CardT[], card: CardT): CardT[] {
  return cards.map((_card: CardT) =>
    _card.id === card.id ? revealCard(_card) : _card,
  );
}

async function processCard(
  e: BaseSyntheticEvent,
  card: CardT,
  deck: t,
  cardApi: CardApiType,
): Promise<t> {
  let _deck = { ...deck, cards: revealSelectedCard(deck.cards, card) };

  const { selectedCards } = _deck;

  switch (card.state) {
    case CardState.Hidden:
      cardApi.showCard(e.target.parentNode);
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
            cardApi.showCard(e.target.parentNode);
            return { ...card, state: CardState.Visible };
          } else {
            cardApi.hideCard(e.target.parentNode);
            return { ...card, state: CardState.Hidden };
          }
        } else {
          return _card;
        }
      });
      _deck = { ..._deck, cards, selectedCards: [card] };
      break;

    case 1:
      const _selectedCards = cardsSet([...selectedCards, card]);
      console.log('one selected card: ', _selectedCards);

      // Guessed the card
      if (_selectedCards.length === 1) {
        console.log('Guesses card: ', card);
        _deck = {
          ..._deck,
          selectedCards: [],
          afterEffect: guessCardEffect(_deck, card),
        };
      }
      // Did not guessed the card
      if (_selectedCards.length === 2) {
        console.log('Did not guessed the card: ', card);
        // cardApi.showCard(e.target.parentNode)
        _deck = {
          ..._deck,
          selectedCards: [],
          afterEffect: missCardEffect(_deck),
        };
      }
      break;

    case 2:
      console.log('two selected cards ', selectedCards);
      break;
  }

  return _deck;
}

export function Deck() {
  return {
    init,
    processCard,
  };
}
