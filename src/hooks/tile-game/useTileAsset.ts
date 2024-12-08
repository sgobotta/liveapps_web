import { v4 } from 'uuid';
import { TileAsset as TileAssetT } from '../../types';
import { TileAssetI } from '../../interfaces';

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
