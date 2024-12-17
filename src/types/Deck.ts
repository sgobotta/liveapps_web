import { Tile } from './Tile';

export enum DeckState {
  Blocked,
  Unblocked,
}

export type Deck = {
  state: DeckState;
  tiles: Tile[];
  selectedTiles: Tile[];
  newDeck?: Deck | null;
};
