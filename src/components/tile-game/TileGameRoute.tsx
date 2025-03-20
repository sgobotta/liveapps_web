import { ReactElement } from 'react';
import { takeSome } from '../../utils';
import useImages from '../../hooks/tile-game/useImages';
import { useTileAsset } from '../../hooks';
import { TileAsset as TileAssetT } from '../../types';
import TileGame from './TileGame';
import { HomeIcon } from '../../svg/HomeIcon';
import { useNavigate } from 'react-router';

export default function TileGameRoute(): ReactElement {
  const navigate = useNavigate();
  const { images } = useImages();
  const { create: createTileAsset } = useTileAsset();

  const filteredImages = takeSome(images, 18);
  const tileAssets = filteredImages.map(
    (image: string): TileAssetT => createTileAsset(image),
  );

  return (
    <div>
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
      <TileGame tiles={tileAssets} />
    </div>
  );
}
