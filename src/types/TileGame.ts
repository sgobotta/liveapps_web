import { BaseSyntheticEvent } from 'react';
import { TileI } from '../interfaces';
import { TileAsset } from './TileAsset';
import { Deck } from './Deck';

export type TileGameProps = {
  tiles: TileAsset[];
};

export type TileGame = {
  getDeck: Deck;
  setDeck: React.Dispatch<React.SetStateAction<Deck>>;
  onTileClick: (
    deck: Deck,
  ) => (
    e: BaseSyntheticEvent,
    tileId: string,
    tileAPI: TileI,
  ) => Promise<BaseSyntheticEvent>;
};
