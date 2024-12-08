import { Card as CardT } from './Card';

export type Deck = {
  cards: CardT[];
  selectedCards: CardT[];
  afterEffect?: Deck | null;
};
