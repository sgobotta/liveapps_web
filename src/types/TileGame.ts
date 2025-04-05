import { BaseSyntheticEvent } from 'react';
import { TileI } from '../interfaces';
import { TileAsset } from './TileAsset';
import { Deck } from './Deck';
import { TileScoreboard } from './TileScoreboard';

export enum TileGameState {
  Idle,
  Started,
  Resumed,
  Paused,
  Finished,
}

export type TileGameProps = {
  tiles: TileAsset[];
  state: TileGameState;
  onPause: () => void;
  onFinish: () => void;
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
  scoreboard: TileScoreboard;
};

export type TileGameCallbacks = {
  onFinish: () => void;
};
