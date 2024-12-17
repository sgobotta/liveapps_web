import { Deck } from './Deck';

export enum Outcome {
  Match,
  Mismatch,
  Selection,
}

export type Move = {
  newDeck: Deck | null;
  outcome: Outcome;
};
