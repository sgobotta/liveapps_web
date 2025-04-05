import Board from './Board';
import { Deck } from '../../types';
import { useTileGame } from '../../hooks/tile-game/useTileGame';
import { TileGame, TileGameProps, TileGameState } from '../../types/TileGame';
import { ReactElement, useState } from 'react';
import { useElapsedTime } from '../../hooks/tile-game/useElapsedTime';
import { PauseIcon } from '../ui/icons';

export default function TileGameComponent({
  tiles,
  state,
  onPause,
  onFinish,
}: TileGameProps): ReactElement {
  const { getDeck, onTileClick, scoreboard }: TileGame = useTileGame(
    tiles,
    state,
    {
      onFinish,
    },
  );

  const { elapsedTime } = useElapsedTime(state);

  const [pauseButton] = useState(<PauseButton onClick={onPause} />);

  function elementKey(index: number) {
    return `tile-${index}`;
  }

  function renderDeck(deck: Deck) {
    return (
      <Board
        deck={deck}
        elementKeyFunction={elementKey}
        onTileClick={onTileClick}
        scoreboard={scoreboard}
        state={state}
        elapsedTime={elapsedTime}
      />
    );
  }

  function tileGameContainerClass(state: TileGameState) {
    switch (state) {
      case TileGameState.Idle:
        return 'blur-sm';

      case TileGameState.Finished:
        return 'blur-none';

      case TileGameState.Paused:
        return 'blur-sm';

      case TileGameState.Started:
        return 'blur-none';
    }
  }

  function PauseButton({ onClick }: { onClick: () => void }) {
    return (
      <div
        className="
          absolute top-3 right-3
          hover:cursor-pointer
          active:animate-jump-out hover:animate-jump
          z-10
        "
        onClick={onClick}
      >
        <PauseIcon />
      </div>
    );
  }

  return (
    <div className={`h-screen ${tileGameContainerClass(state)}`}>
      {pauseButton}
      {renderDeck(getDeck)}
    </div>
  );
}
