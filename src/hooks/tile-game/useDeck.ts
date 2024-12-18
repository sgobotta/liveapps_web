import { shuffleArray } from '../../utils';
import {
  Tile,
  TileState,
  Deck,
  TileAsset,
  DeckState,
  Outcome,
} from '../../types';
import { DeckI, TileI } from '../../interfaces';
import { BaseSyntheticEvent } from 'react';
import { useTile } from './useTile';

export const useDeck = (): DeckI => {
  const {
    hasBeenMatched,
    hide: hideTile,
    init: initTile,
    match: matchTile,
    reveal: revealTile,
    equal,
  } = useTile();

  // ---------------------------------------------------------------------------
  // Internal API
  //

  function _tilesSet(tiles: Tile[]): Tile[] {
    return Array.from(tiles).filter(
      (nextTile: Tile, index: number, self: Tile[]) =>
        self.findIndex((prevTile) => equal(prevTile, nextTile)) === index,
    );
  }

  function _revealSelectedTile(deck: Deck, selectedTile: Tile): Deck {
    const tiles = deck.tiles.map((tile: Tile) =>
      tile.id === selectedTile.id ? revealTile(tile) : tile,
    );

    return {
      ..._blockDeck(deck),
      tiles,
    };
  }

  function _hideRemainingTiles(deck: Deck): Deck {
    return {
      ...deck,
      tiles: deck.tiles.map((tile: Tile) => {
        if (!hasBeenMatched(tile)) {
          return hideTile(tile);
        }
        return tile;
      }),
    };
  }

  function _markAsMatched(deck: Deck, selectedTiles: Tile[]): Deck {
    return {
      ...deck,
      tiles: deck.tiles.map((tile: Tile) => {
        if (
          selectedTiles.some((selectedTile: Tile) => equal(selectedTile, tile))
        )
          return matchTile(tile);
        return tile;
      }),
    };
  }

  function _processTilesMatch(deck: Deck, selectedTiles: Tile[]): Deck {
    let _deck = _markAsMatched(deck, selectedTiles);
    _deck = { ..._unBlockDeck(_deck) };

    return {
      ..._deck,
      selectedTiles: [],
      lastMove: {
        newDeck: null,
        outcome: Outcome.Nothing,
      },
    };
  }

  function _processTileMismatch(deck: Deck): Deck {
    let _deck = _hideRemainingTiles(deck);
    _deck = { ..._unBlockDeck(_deck) };

    return {
      ..._deck,
      selectedTiles: [],
      lastMove: {
        newDeck: null,
        outcome: Outcome.Nothing,
      },
    };
  }

  function _processTileSelection(deck: Deck, selectedTile: Tile): Deck {
    const tiles = deck.tiles.map((tile: Tile) => {
      if (tile.id === selectedTile.id) {
        if (tile.state === TileState.Hidden) {
          // tileAPI.showTileEffects(e.target.parentNode);
          return revealTile(tile);
        } else {
          return tile;
        }
      } else {
        return tile;
      }
    });

    return { ...deck, tiles, selectedTiles: [selectedTile] };
  }

  function _blockDeck(deck: Deck): Deck {
    return { ...deck, state: DeckState.Blocked };
  }

  function _unBlockDeck(deck: Deck): Deck {
    return { ...deck, state: DeckState.Unblocked };
  }

  // ---------------------------------------------------------------------------
  // Exportable API
  //

  function init(tiles: TileAsset[]): Deck {
    return {
      tiles: (shuffleArray(tiles.concat(tiles)) as unknown as TileAsset[]).map(
        (tile: TileAsset, index: number) => initTile(tile, index),
      ),
      selectedTiles: [],
      state: DeckState.Unblocked,
      lastMove: {
        outcome: Outcome.Nothing,
        newDeck: null,
      },
    };
  }

  function isBlocked(deck: Deck): boolean {
    return deck.state === DeckState.Blocked;
  }

  function findTile(deck: Deck, tileId: string): Tile | undefined {
    return deck.tiles.find((tile: Tile) => tile.id === tileId);
  }

  async function processTile(
    e: BaseSyntheticEvent,
    tile: Tile,
    deck: Deck,
    tileAPI: TileI,
  ): Promise<Deck> {
    let _deck = { ...deck };

    const { selectedTiles } = _deck;

    switch (tile.state) {
      case TileState.Hidden:
        tileAPI.showTileEffects(e.target.parentNode);
        break;

      case TileState.Selected:
        break;

      case TileState.Matched:
        break;
    }

    switch (selectedTiles.length) {
      case 0:
        console.debug('No selected tiles: ', selectedTiles);
        _deck = _processTileSelection(_deck, tile);
        break;

      case 1:
        const _selectedTiles = _tilesSet([...selectedTiles, tile]);
        // Guessed the tile
        if (_selectedTiles.length === 1) {
          _deck = _revealSelectedTile(_deck, tile);
          _deck = {
            ..._deck,
            lastMove: {
              newDeck: _processTilesMatch(_deck, [...selectedTiles, tile]),
              outcome: Outcome.Match,
            },
          };
          break;
        }
        // Did not guessed the tile
        if (_selectedTiles.length === 2) {
          console.debug('Did not guessed the tile: ', tile);
          // tileApi.showTile(e.target.parentNode)
          _deck = _revealSelectedTile(_deck, tile);
          _deck = {
            ..._deck,
            lastMove: {
              newDeck: _processTileMismatch(_deck),
              outcome: Outcome.Mismatch,
            },
          };
          break;
        }
        break;
    }

    return _deck;
  }

  return {
    init,
    isBlocked,
    findTile,
    processTile,
  };
};
