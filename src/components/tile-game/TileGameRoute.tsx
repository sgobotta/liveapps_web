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

  function startGame() {}

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
      <div className="absolute w-full h-full z-[9]">
        <div className="flex flex-row justify-center h-full items-center">
          <div
            className="
            w-full h-[200px] mx-8 sm:mx-0
            sm:w-[400px]
            text-zinc-300 
            bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 from-30% to-90%
            border-[1px] border-zinc-800/30
            flex flex-col
            gap-8 p-6 justify-items-center
            shadow-2xl
            rounded-[6px]
            items-center
            justify-center
          "
          >
            <p className="text-xl font-normal">
              Press start to shuffle pictures!
            </p>
            <button
              onClick={startGame}
              className="
                w-fit
                py-2 px-6 rounded-lg shadow-lg
                bg-zinc-200 border-zinc-900/30 border-[1px] text-zinc-900
                pressable font-bold hover:underline active:italic transition-all duration-500
              "
            >
              Start
            </button>
          </div>
        </div>
      </div>
      <div className="blur-sm h-screen">
        <TileGame tiles={tileAssets} />
      </div>
    </div>
  );
}
