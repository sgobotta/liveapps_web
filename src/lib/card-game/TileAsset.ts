import { v4 } from 'uuid';
import { TileAsset as TileAssetT } from '../../types/TileAsset';

export default function TileAsset(image: string): TileAssetT {
  return {
    image,
    twinId: v4(),
  };
}
