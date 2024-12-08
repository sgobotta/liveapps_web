import { v4 } from 'uuid';

export type TileAssetT = {
  image: string,
  twinId: string
}

export default function TileAsset(image: string): TileAssetT {
  return {
    image,
    twinId: v4()
  }
}