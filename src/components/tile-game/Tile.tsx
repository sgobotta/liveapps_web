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
  // border-[1px] hover:border-2 border-zinc-600 transition duration-[0.75s]
  // active:scale-x-[-0.8] active:scale-y-[0.8]

  // hover:rounded-t-md ${index % 2 ? 'hover:rounded-r-md active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
  // ${index % 2 ? 'hover:-rotate-6 active:rotate-0' : 'hover:rotate-6 active:-rotate-0'}
  // hover:scale-[1] hover:border-dashed hover:border-zinc-300
  // grayscale

  function renderImage(state: TileState, index: number, imagePath: string) {
    const _render = (imagePath: string, index: number): React.ReactElement => (
      <img
        src={buildImagePath(imagePath)}
        alt={`image-${index}`}
        className={`
          transition-all duration-[2s] ease-[cubic-bezier(0.035,0.795,0.05,0.95)]
          hover:rounded-md hover:rounded-t-md
          ${index % 2 ? 'hover:rounded-r-md hover:-rotate-6 active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
          hover:translate-x-3 hover:-translate-y-3
          opacity-80 hover:opacity-100
          border-[1px] border-accent-s-900/80 
        `}
        fetchPriority={index < 16 ? 'high' : 'low'}
      />
    );

    switch (state) {
      case TileState.Hidden:
        return _render('images/back-tile.png', index);

      case TileState.Selected || TileState.Matched:
        return _render(imagePath, index);
    }
  }

  const _onClick =
    state === TileState.Selected
      ? () => {}
      : (e: React.MouseEvent) => onClick!(e, id, tileAPI);

  return (
    <div
      onClick={_onClick}
      className={`
        border-[1px] hover:border-2 border-zinc-600 transition duration-[0.75s]
        scale-100
        z-10
      `}
      key={id}
    >
      {renderImage(state, index, asset.image)}
    </div>
  );
}
