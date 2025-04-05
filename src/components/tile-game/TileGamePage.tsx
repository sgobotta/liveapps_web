import { takeSome } from '../../utils';
import useImages from '../../hooks/tile-game/useImages';
import { useTileAsset } from '../../hooks';
import { TileAsset as TileAssetT, TileGameState } from '../../types';
import TileGame from './TileGame';
import { useNavigate } from 'react-router';
import Alert from '../ui/Alert';
import { useMemo, useState } from 'react';
import { HomeIcon } from '../ui/icons';

export default function TileGamePage() {
  const navigate = useNavigate();
  const { images } = useImages();
  const { create: createTileAsset } = useTileAsset();
  const [homeClicked, setHomeClicked] = useState<boolean>(false);

  const [gameState, setGameState] = useState<TileGameState>(TileGameState.Idle);

  const tileAssets = useMemo(() => {
    const filteredImages = takeSome(images, 18);
    const _tileAssets = filteredImages.map(
      (image: string): TileAssetT => createTileAsset(image),
    );
    return _tileAssets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  function onStart() {
    setGameState(TileGameState.Started);
  }

  function onResume() {
    setGameState(TileGameState.Started);
  }

  function onPause() {
    setGameState(TileGameState.Paused);
  }

  function onFinish() {
    setGameState(TileGameState.Finished);
  }

  function onNavigateHome() {
    setHomeClicked(true);
  }

  function navigateHome() {
    navigate('/');
  }

  return (
    <div className="select-none">
      <div
        className="
          absolute top-3 left-3
          hover:cursor-pointer hover:animate-wiggle
          active:animate-jump-out
          z-10
        "
        onClick={onNavigateHome}
      >
        <HomeIcon />
      </div>
      <div className="z-10">
        <Alert
          onConfirm={navigateHome}
          confirmText="Leave"
          onCancel={() => setHomeClicked(false)}
          cancelText="Back"
          contentText="Leaving this screen will terminate the current game."
          visible={homeClicked}
        />
      </div>
      <Alert
        onConfirm={onStart}
        confirmText="Start"
        contentText="Press start to shuffle pictures!"
        visible={gameState === TileGameState.Idle}
      />
      <Alert
        onConfirm={onResume}
        confirmText="Resume"
        contentText="Press the button to continue"
        visible={gameState === TileGameState.Paused}
      />
      <TileGame
        tiles={tileAssets}
        state={gameState}
        onPause={onPause}
        onFinish={onFinish}
      />
    </div>
  );
}
