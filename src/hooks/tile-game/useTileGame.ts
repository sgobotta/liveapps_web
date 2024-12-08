import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Tile, Deck, TileGame, TileAsset } from '../../types';
import { TileI } from '../../interfaces';
import { useDeck } from './useDeck';

export const useTileGame = (tiles: TileAsset[]): TileGame => {
  const { init: initDeck, findTile, processTile } = useDeck();

  const deck = initDeck(tiles);
  const [getDeck, setDeck] = useState<Deck>(deck);

  const onTileClick =
    (deck: Deck) =>
    async (
      e: BaseSyntheticEvent,
      tileId: string,
      tileAPI: TileI,
    ): Promise<BaseSyntheticEvent> => {
      e.preventDefault();
      const tile: Tile | undefined = findTile(deck, tileId);
      const updatedDeck = await processTile(e, tile!, deck, tileAPI);

      setDeck(updatedDeck);

      return e;
    };

  useEffect(() => {
    setDeck(deck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles]);

  useEffect(() => {
    if (getDeck.afterEffect) {
      console.log('Saving afterEffect deck... ', getDeck);
      setDeck({ ...getDeck, afterEffect: null });

      new Promise((resolve) => {
        setTimeout(() => {
          return resolve(getDeck.afterEffect);
        }, 2000);
      }).then((updatedDeck) => {
        setDeck(updatedDeck as Deck);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDeck.afterEffect]);

  return { getDeck, setDeck, onTileClick: onTileClick };
};
