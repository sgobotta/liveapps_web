import { shuffleArray } from '../../utils';
import { Tile, TileI, TileState, Deck, TileAsset, DeckI } from '../../types';
import { BaseSyntheticEvent } from 'react';
import { useTile } from './useTile';

export const useDeck = (): DeckI => {
  const { hide: hideTile, init: initTile, reveal: revealTile } = useTile();

  // ---------------------------------------------------------------------------
  // Internal API
  //

  function _tilesSet(tiles: Tile[]): Tile[] {
    return Array.from(tiles).filter(
      (member: Tile, index: number, self: Tile[]) =>
        self.findIndex((m) => m.id === member.id) === index,
    );
  }

  function _revealSelectedTile(tiles: Tile[], tile: Tile): Tile[] {
    return tiles.map((_tile: Tile) =>
      _tile.id === tile.id ? revealTile(_tile) : _tile,
    );
  }

  function _hideAllTiles(deck: Deck): Deck {
    return { ...deck, tiles: deck.tiles.map((tile: Tile) => hideTile(tile)) };
  }

  function _hideAllTilesExcept(deck: Deck, tile: Tile): Deck {
    return {
      ...deck,
      tiles: [
        ...deck.tiles
          .filter((_tile: Tile) => _tile.id !== tile.id)
          .map((tile: Tile) => hideTile(tile)),
        tile,
      ],
    };
  }

  function _guessTileEffect(deck: Deck, tile: Tile): Deck {
    return {
      ...deck,
      ..._hideAllTilesExcept(deck, tile),
      afterEffect: null,
    };
  }

  function _missTileEffect(deck: Deck): Deck {
    return {
      ...deck,
      ..._hideAllTiles(deck),
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
    let _deck = { ...deck, tiles: _revealSelectedTile(deck.tiles, tile) };

    const { selectedTiles } = _deck;

    switch (tile.state) {
      case TileState.Hidden:
        tileAPI.showTileEffects(e.target.parentNode);
        break;

      case TileState.Visible:
        break;
    }

    switch (selectedTiles.length) {
      case 0:
        console.log('no selected tiles: ', selectedTiles);
        const tiles = deck.tiles.map((_tile: Tile) => {
          if (_tile.id === tile.id) {
            if (tile.state === TileState.Hidden) {
              tileAPI.showTileEffects(e.target.parentNode);
              return { ...tile, state: TileState.Visible };
            } else {
              tileAPI.hideTileEffects(e.target.parentNode);
              return { ...tile, state: TileState.Hidden };
            }
          } else {
            return _tile;
          }
        });
        _deck = { ..._deck, tiles: tiles, selectedTiles: [tile] };
        break;

      case 1:
        const _selectedTiles = _tilesSet([...selectedTiles, tile]);
        console.log('one selected tile: ', _selectedTiles);

        // Guessed the tile
        if (_selectedTiles.length === 1) {
          console.log('Guesses tile: ', tile);
          _deck = {
            ..._deck,
            selectedTiles: [],
            afterEffect: _guessTileEffect(_deck, tile),
          };
        }
        // Did not guessed the tile
        if (_selectedTiles.length === 2) {
          console.log('Did not guessed the tile: ', tile);
          // tileApi.showTile(e.target.parentNode)
          _deck = {
            ..._deck,
            selectedTiles: [],
            afterEffect: _missTileEffect(_deck),
          };
        }
        break;

      case 2:
        console.log('two selected tiles ', selectedTiles);
        break;
    }

    return _deck;
  }

  return {
    init,
    findTile,
    processTile,
  };
};
