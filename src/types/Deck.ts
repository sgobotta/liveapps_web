import { Tile } from './Tile';
import { Move } from './Move';

export enum DeckState {
  Blocked,
  Unblocked,
}

export type Deck = {
  state: DeckState;
  tiles: Tile[];
  selectedTiles: Tile[];
  newDeck?: Deck | null;
  lastMove?: Move;
};
