import { Deck } from './Deck';

export enum Outcome {
  Match,
  Mismatch,
  Nothing,
  Selection,
}

export type Move = {
  newDeck: Deck | null;
  outcome: Outcome;
};
