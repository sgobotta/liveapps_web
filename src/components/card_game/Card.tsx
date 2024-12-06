import { BaseSyntheticEvent } from "react";

export type t = {
  imagePath: string;
  state: string;
  id: string;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => boolean;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => boolean;
  onClick?: (e: BaseSyntheticEvent, cardId: string, cardApi: CardApiType) => BaseSyntheticEvent;
}

function buildImagePath(location: string): string {
  return process.env.PUBLIC_URL + location
}

export type CardApiType = {
  showCard: (cardElement: any) => void,
  hideCard: (cardElement: any) => void
}

export function cardApi(): CardApiType {
  return {
    showCard: (cardElement: any) => {
      cardElement.classList.replace("grayscale", "!grayscale-0")
    },
    hideCard: (cardElement: any) => {
      cardElement.classList.replace("!grayscale-0", "grayscale")
    }
  }
}

export default function Card({
  id,
  imagePath,
  index,
  onClick,
  onDragStart,
  onDrop,
  state,
}: t): React.ReactElement {

  // border-[1px] hover:border-2 border-zinc-600 transition duration-[0.75s]
  // active:scale-x-[-0.8] active:scale-y-[0.8]
  
  // hover:rounded-t-md ${index % 2 ? 'hover:rounded-r-md active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
  // ${index % 2 ? 'hover:-rotate-6 active:rotate-0' : 'hover:rotate-6 active:-rotate-0'}
  // hover:scale-[1] hover:border-dashed hover:border-zinc-300
  // grayscale

  function renderImage(state: string, index: number, imagePath: string) {
    const _render = (imagePath: string, index: number): React.ReactElement => (
      <img
        src={buildImagePath(imagePath)}
        alt={`image-${index}`}
        className={`
          transition-all duration-[2s] ease-[cubic-bezier(0.035,0.795,0.05,0.95)]
          hover:rounded-md hover:rounded-t-md
          ${index % 2 ? 'hover:rounded-r-md active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
          hover:translate-x-3 hover:-translate-y-3
          opacity-80 hover:opacity-100
          border-[1px] border-accent-s-900/80 
        `}
        fetchPriority={index < 16 ? 'high' : 'low'}
      />
    )

    switch (state) {
      case "hidden":
        return _render("images/back-card.png", index)
    
      case "visible":
        return _render(imagePath, index)
    }
  }

  return (
    <div
      onClick={async (e: React.MouseEvent) => onClick!(e, id, cardApi())}
      onDragStart={onDragStart}
      onDrop={onDrop}
      className={`
        border-[1px] hover:border-2 border-zinc-600 transition duration-[0.75s]
        scale-100
        z-10
      `}
      key={id}
    >
      {renderImage(state, index, imagePath)}
    </div>
  )
}