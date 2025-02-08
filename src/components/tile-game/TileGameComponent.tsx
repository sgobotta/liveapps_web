import { ReactElement } from 'react';
import { takeSome } from '../../utils';
import useImages from '../../hooks/tile-game/useImages';
import { useTileAsset } from '../../hooks';
import { TileAsset as TileAssetT } from '../../types';
import TileGame from './TileGame';

export default function TileGameComponent(): ReactElement {
  const { images } = useImages();
  const { create: createTileAsset } = useTileAsset();

  const filteredImages = takeSome(images, 18);
  const tileAssets = filteredImages.map(
    (image: string): TileAssetT => createTileAsset(image),
  );

  return (
    <div>
      <TileGame tiles={tileAssets} />
    </div>
  );
}
