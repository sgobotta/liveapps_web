import { TileScoreboard } from '../types';

export interface TileScoreboardI {
  scoreboard: TileScoreboard;
  onMatch: () => void;
  onMismatch: () => void;
}
