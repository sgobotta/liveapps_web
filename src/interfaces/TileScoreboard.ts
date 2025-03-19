import { TileScoreboard } from '../types';

export interface TileScoreboardI {
  scoreboard: TileScoreboard;
  onAttempt: () => void;
  onMatch: () => void;
  onMismatch: () => void;
}
