import { takeSome } from '../../utils';
import useImages from '../../hooks/tile-game/useImages';
import { useTileAsset } from '../../hooks';
import { TileAsset as TileAssetT } from '../../types';
import TileGame from './TileGame';
import { HomeIcon } from '../../svg/HomeIcon';
import { useNavigate } from 'react-router';
import Alert from '../ui/Alert';

export default function TileGamePage() {
  const navigate = useNavigate();
  const { images } = useImages();
  const { create: createTileAsset } = useTileAsset();

  const filteredImages = takeSome(images, 18);
  const tileAssets = filteredImages.map(
    (image: string): TileAssetT => createTileAsset(image),
  );

  function startGame() {}

  return (
    <div className="select-none">
      <div
        className="
          absolute top-3 left-3
          hover:cursor-pointer hover:animate-wiggle
          active:animate-jump-out
          z-10
        "
        onClick={() => navigate('/')}
      >
        <HomeIcon />
      </div>
      <Alert
        onConfirm={startGame}
        confirmText="Start"
        contentText="Press start to shuffle pictures!"
        visible={true}
      />
      <div className="blur-sm h-screen">
        <TileGame tiles={tileAssets} />
      </div>
    </div>
  );
}
