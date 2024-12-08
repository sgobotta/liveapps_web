import { v4 } from 'uuid';
import { TileAsset as TileAssetT } from '../../types';

export interface TileAssetI {
  create: (image: string) => TileAssetT;
}

export const useTileAsset = (): TileAssetI => {
  function create(image: string): TileAssetT {
    return {
      image,
      twinId: v4(),
    };
  }

  return {
    create,
  };
};
