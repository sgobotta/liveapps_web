import Board from './Board';
import { t as DeckProps } from './Deck';
import { useCardGame, t as CardGameT } from '../../hooks/useCardGame';
import { TileAssetT } from '../../lib/card-game/TileAsset';

type CardGameProps = {
  tiles: TileAssetT[];
};

export default function CardGame({ tiles }: CardGameProps) {
  const { getDeck, onCardClick }: CardGameT = useCardGame(tiles);

  function elementKey(index: number) {
    return `card-${index}`;
  }

  function renderDeck(deck: DeckProps) {
    return (
      <Board
        deck={deck}
        elementKeyFunction={elementKey}
        onCardClick={onCardClick}
      />
    );
  }

  return renderDeck(getDeck);
}
