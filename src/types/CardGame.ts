import { BaseSyntheticEvent } from 'react';
import { CardAPI as CardAPIT } from './Card';
import { TileAsset as TileAssetT } from './TileAsset';
import { Deck as DeckT } from './Deck';

export type CardGameProps = {
  tiles: TileAssetT[];
};

export type CardGame = {
  getDeck: DeckT;
  setDeck: React.Dispatch<React.SetStateAction<DeckT>>;
  onCardClick: (
    deck: DeckT,
  ) => (
    e: BaseSyntheticEvent,
    cardId: string,
    cardApi: CardAPIT,
  ) => Promise<BaseSyntheticEvent>;
};
