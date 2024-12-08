import { BaseSyntheticEvent } from 'react';
import { CardI, Card as CardT } from './Card';
import { TileAsset as TileAssetT } from './TileAsset';

export type Deck = {
  cards: CardT[];
  selectedCards: CardT[];
  afterEffect?: Deck | null;
};

export interface DeckI {
  init: (tiles: TileAssetT[]) => Deck;
  findCard: (deck: Deck, cardId: string) => CardT | undefined;
  processCard: (
    e: BaseSyntheticEvent,
    card: CardT,
    deck: Deck,
    cardAPI: CardI,
  ) => Promise<Deck>;
}
