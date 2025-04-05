import { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
  Tile,
  Deck,
  TileGame,
  TileGameCallbacks,
  TileAsset,
  Move,
  Outcome,
} from '../../types';
import { TileI } from '../../interfaces';
import { useDeck } from './useDeck';
import { useScoreboard } from './useScoreboard';

export const useTileGame = (
  tiles: TileAsset[],
  { onFinish }: TileGameCallbacks,
): TileGame => {
  const {
    init: initDeck,
    findTile,
    processTile,
    isBlocked,
    isFinished,
  } = useDeck();

  const { scoreboard, onMatch, onMismatch } = useScoreboard(tiles);

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
      if (!isBlocked(deck)) {
        const tile: Tile | undefined = findTile(deck, tileId);
        const updatedDeck = await processTile(
          e,
          tile!,
          deck,
          tileAPI,
          onMatch,
          onMismatch,
        );

        setDeck(updatedDeck);
      }

      return e;
    };

  function _shouldUseTimeout(move: Move): boolean {
    return [Outcome.Mismatch].includes(move.outcome);
  }

  useEffect(() => {
    setDeck(deck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles]);

  useEffect(() => {
    if (getDeck.lastMove.newDeck) {
      new Promise((resolve) => {
        setTimeout(
          () => {
            return resolve(getDeck.lastMove.newDeck);
          },
          _shouldUseTimeout(getDeck.lastMove) ? 1500 : 200,
        );
      }).then((updatedDeck) => {
        if (isFinished(updatedDeck as Deck)) {
          onFinish();
        }
        setDeck(updatedDeck as Deck);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDeck.lastMove.newDeck]);

  return { getDeck, setDeck, onTileClick: onTileClick, scoreboard };
};
