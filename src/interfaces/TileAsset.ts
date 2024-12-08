import { TileAsset } from '../types';

export interface TileAssetI {
  create: (image: string) => TileAsset;
  equal: (tileA: TileAsset, tileB: TileAsset) => boolean;
}
