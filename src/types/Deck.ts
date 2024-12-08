import { Tile as TileT } from './Tile';

export enum DeckState {
  Blocked,
  Unblocked,
}

export type Deck = {
  state: DeckState;
  tiles: TileT[];
  selectedTiles: TileT[];
  afterEffect?: Deck | null;
};
