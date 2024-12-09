import { BaseSyntheticEvent } from 'react';
import { Deck, TileAsset, Tile } from '../types';
import { TileI } from './Tile';

export interface DeckI {
  init: (tiles: TileAsset[]) => Deck;
  isBlocked: (deck: Deck) => boolean;
  findTile: (deck: Deck, tileId: string) => Tile | undefined;
  processTile: (
    e: BaseSyntheticEvent,
    tile: Tile,
    deck: Deck,
    tileAPI: TileI,
  ) => Promise<Deck>;
}
