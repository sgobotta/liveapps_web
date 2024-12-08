import { shuffleArray } from '../../utils';
import { Tile, TileState, Deck, TileAsset } from '../../types';
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

  function _revealSelectedTile(tiles: Tile[], tile: Tile): Tile[] {
    return tiles.map((_tile: Tile) =>
      _tile.id === tile.id ? revealTile(_tile) : _tile,
    );
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

  function _markAsmatched(deck: Deck, selectedTiles: Tile[]): Deck {
    const tiles = deck.tiles.map((tile: Tile) => {
      if (selectedTiles.some((selectedTile: Tile) => equal(selectedTile, tile)))
        return matchTile(tile);
      return tile;
    });
    return {
      ...deck,
      tiles,
    };
  }

  function _guessTileEffect(deck: Deck, selectedTiles: Tile[]): Deck {
    return {
      ...deck,
      ..._markAsmatched(deck, selectedTiles),
      selectedTiles: [],
      afterEffect: null,
    };
  }

  function _missTileEffect(deck: Deck): Deck {
    return {
      ...deck,
      ..._hideRemainingTiles(deck),
      selectedTiles: [],
      afterEffect: null,
    };
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
    };
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
        console.log('no selected tiles: ', selectedTiles);
        const tiles = _deck.tiles.map((_tile: Tile) => {
          if (_tile.id === tile.id) {
            if (tile.state === TileState.Hidden) {
              tileAPI.showTileEffects(e.target.parentNode);
              // TODO: nullify the onClick
              return revealTile(_tile);
            } else {
              // tileAPI.hideTileEffects(e.target.parentNode);
              // Nothing happens when clicking the same tile on Selected state
              return _tile;
            }
          } else {
            return _tile;
          }
        });
        _deck = { ..._deck, tiles, selectedTiles: [tile] };
        break;

      case 1:
        const _selectedTiles = _tilesSet([...selectedTiles, tile]);
        // Guessed the tile
        if (_selectedTiles.length === 1) {
          console.log('Guesses tile: ', tile);
          _deck = {
            ..._deck,
            tiles: _revealSelectedTile([..._deck.tiles], tile),
            selectedTiles: [],
            afterEffect: _guessTileEffect(_deck, [...selectedTiles, tile]),
          };
        }
        // Did not guessed the tile
        if (_selectedTiles.length === 2) {
          console.log('Did not guessed the tile: ', tile);
          // tileApi.showTile(e.target.parentNode)
          _deck = {
            ..._deck,
            tiles: _revealSelectedTile([..._deck.tiles], tile),
            selectedTiles: [],
            afterEffect: _missTileEffect(_deck),
          };
        }
        break;

      case 2:
        console.log('two selected tiles ', selectedTiles);
        break;
    }

    console.log('onProcessTile ', _deck);
    return _deck;
  }

  return {
    init,
    findTile,
    processTile,
  };
};
