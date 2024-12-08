import { Tile as TileT } from './Tile';

export type Deck = {
  tiles: TileT[];
  selectedTiles: TileT[];
  afterEffect?: Deck | null;
};
