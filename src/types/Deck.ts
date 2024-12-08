import { BaseSyntheticEvent } from 'react';
import { TileI, Tile as TileT } from './Tile';
import { TileAsset as TileAssetT } from './TileAsset';

export type Deck = {
  tiles: TileT[];
  selectedTiles: TileT[];
  afterEffect?: Deck | null;
};

export interface DeckI {
  init: (tiles: TileAssetT[]) => Deck;
  findTile: (deck: Deck, cardId: string) => TileT | undefined;
  processTile: (
    e: BaseSyntheticEvent,
    card: TileT,
    deck: Deck,
    cardAPI: TileI,
  ) => Promise<Deck>;
}
