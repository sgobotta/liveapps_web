import { v4 } from 'uuid';
import { TileAsset } from '../../types';
import { TileAssetI } from '../../interfaces';

export const useTileAsset = (): TileAssetI => {
  function create(image: string): TileAsset {
    return {
      image,
      twinId: v4(),
    };
  }

  function equal(
    { twinId: twinIdA }: TileAsset,
    { twinId: twinIdB }: TileAsset,
  ): boolean {
    return twinIdA === twinIdB;
  }

  return {
    create,
    equal,
  };
};
