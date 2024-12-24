import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useTile } from '../../hooks/tile-game/useTile';
import { TileState } from '../../types';
import { Tile } from '../../types';

function buildImagePath(location: string): string {
  return process.env.PUBLIC_URL + location;
}

export default function TileComponent({
  id,
  asset,
  index,
  onClick,
  state,
}: Tile): React.ReactElement {
  const tileAPI = useTile();

  const [getAssetImage, setAssetImage] = useState<string>(asset.image);

  function renderImage(state: TileState, index: number, imagePath: string) {
    const _render = (
      imagePath: string,
      index: number,
      {
        extraClasses = [],
        flippable = false,
      }: {
        extraClasses: string[];
        flippable: boolean;
      },
    ): React.ReactElement => (
      <div className="flip-card aspect-square">
        <div
          className={`
            flex flex-col justify-center
            flip-card-inner
            relative transition duration-[0.8s]
            ${flippable ? 'flippable' : 'idle'}
          `}
        >
          <div className="flip-card-front">
            <div>
              <div className="flex justify-center">
                <img
                  src={buildImagePath('images/back-tile.png')}
                  alt={`image-${index}`}
                  className={`
                    transition-all duration-[2s] ease-[cubic-bezier(0.035,0.795,0.05,0.95)]
                    rounded-sm
                    opacity-80
                    border-[1px] border-accent-s-900/80 
                    ${extraClasses.join(', ')}
                    
                  `}
                  fetchPriority={index < 16 ? 'high' : 'low'}
                />
              </div>
            </div>
          </div>
          <div
            className="
            flip-card-back flex flex-col lign-center
            absolute justify-evenly h-full w-full
          "
          >
            <img
              src={buildImagePath(imagePath)}
              alt={`image-${index}`}
              className={`
                transition-all duration-[2s] ease-[cubic-bezier(0.035,0.795,0.05,0.95)]
                rounded-sm
                opacity-80
                border-[1px] border-accent-s-900/80 
                ${extraClasses.join(', ')}
              `}
              fetchPriority={index < 16 ? 'high' : 'low'}
            />
          </div>
        </div>
      </div>
    );

    switch (state) {
      case TileState.Hidden:
        const extraClasses = [
          'hover:translate-x-3 hover:-translate-y-3',
          `${index % 2 ? 'hover:sm:-rotate-6 hover:rounded-r-md sm:active:rotate-0' : 'hover:rounded-l-md'}`,
          'hover:sm:rotate-6 hover:rounded-md hover:rounded-t-md hover:opacity-100',
        ];
        return _render(imagePath, index, { extraClasses, flippable: false });

      case TileState.Selected:
        return _render(imagePath, index, { extraClasses: [], flippable: true });

      case TileState.Matched:
        return _render(imagePath, index, { extraClasses: [], flippable: true });
    }
  }

  const _onClick =
    state === TileState.Hidden
      ? (e: BaseSyntheticEvent) => {
          e.preventDefault();
          onClick!(e, id, tileAPI);
        }
      : () => {};

  useEffect(() => {
    if (state === TileState.Hidden) {
      setTimeout(() => {
        setAssetImage('images/back-tile.png');
      }, 300);
    } else {
      setAssetImage(asset.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div
      onClick={_onClick}
      className={`
        transition duration-[0.75s]
        border-[1px] border-opacity-25 border-zinc-600 border-dashed
        ${state === TileState.Hidden ? 'hover:border-2 hover:border-opacity-75 hover:rounded-lg hover:cursor-pointer' : ''}
        scale-100
        z-10
      `}
      key={id}
    >
      {renderImage(state, index, getAssetImage)}
    </div>
  );
}
