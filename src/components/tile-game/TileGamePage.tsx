import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { takeSome } from '../../utils';
import useImages from '../../hooks/tile-game/useImages';
import { useTileAsset } from '../../hooks';
import { TileAsset as TileAssetT, TileGameState } from '../../types';
import TileGame from './TileGame';
import { useNavigate } from 'react-router';
import Alert from '../ui/Alert';
import { useMemo, useState } from 'react';
import { HomeIcon } from '../ui/icons';
import { useConfetti } from '../../hooks';

export default function TileGamePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { confetti } = useConfetti();
  const { images, shuffle } = useImages();
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
    shuffle();
    setGameState(TileGameState.Started);
  }

  function onResume() {
    setGameState(TileGameState.Resumed);
  }

  function onPause() {
    setGameState(TileGameState.Paused);
  }

  function onFinish() {
    setGameState(TileGameState.Finished);
    confetti();
  }

  function onNavigateHome() {
    setHomeClicked(true);
  }

  function navigateHome() {
    navigate('/');
  }

  return (
    <div className="select-none">
      <LanguageSwitcher />
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
          confirmText={t('tileGame.leave')}
          onCancel={() => setHomeClicked(false)}
          cancelText={t('tileGame.back')}
          contentText={t('tileGame.leaveConfirm')}
          visible={homeClicked}
        />
      </div>
      <Alert
        onConfirm={onStart}
        confirmText={t('tileGame.start')}
        contentText={t('tileGame.startPrompt')}
        visible={gameState === TileGameState.Idle}
      />
      <Alert
        onConfirm={onResume}
        confirmText={t('tileGame.resume')}
        contentText={t('tileGame.resumePrompt')}
        visible={gameState === TileGameState.Paused}
      />
      <Alert
        onConfirm={onStart}
        confirmText={t('tileGame.playAgain')}
        contentText={t('tileGame.congratulations')}
        visible={gameState === TileGameState.Finished}
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
