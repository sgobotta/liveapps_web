import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { CardApiType } from './Card'
import { t as CardT } from '../../lib/card-game/Card';
import Board from './Board';
import { t as DeckProps, Deck } from './Deck';
import { TileAssetT } from '../../lib/card-game/TileAsset';


type CardGameProps = {
  tiles: TileAssetT[]
}

type CardGameAPIType = {
  getDeck: DeckProps;
  setDeck: React.Dispatch<React.SetStateAction<DeckProps>>;
  onCardClick: (deck: DeckProps) => (e: BaseSyntheticEvent, cardId: string, cardApi: CardApiType) => Promise<BaseSyntheticEvent>;
}

const useCardGameAPI = (tiles: TileAssetT[]) => {
  const deck = Deck().init(tiles)
  const [getDeck, setDeck] = useState<DeckProps>(deck)

  async function processCard(e: BaseSyntheticEvent, card: CardT, deck: DeckProps, cardApi: CardApiType): Promise<DeckProps> {
    return await Deck().processCard(e, card, deck, cardApi)
  }

  function findCard(deck: DeckProps, cardId: string): CardT | undefined {
    return deck.cards.find((card: CardT) => card.id === cardId)
  }

  const onCardClick = (deck: DeckProps) => async (e: BaseSyntheticEvent, cardId: string, cardApi: CardApiType): Promise<BaseSyntheticEvent> => {
    e.preventDefault()
    const card: CardT | undefined = findCard(deck, cardId)
    const updatedDeck = await processCard(e, card!, deck, cardApi)

    setDeck(updatedDeck)

    return e
  }

  useEffect(() => {
    setDeck(deck)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles])

  useEffect(() => {
    if (getDeck.afterEffect) {
      console.log("doing some after effect...")
      setDeck({...getDeck, afterEffect: null})
      
      new Promise((resolve) => {
        setTimeout(() => {
          return resolve(getDeck.afterEffect)
        }, 2000)
      })
      .then((updatedDeck) => {
        setDeck(updatedDeck as DeckProps)
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDeck.afterEffect])

  return { getDeck, setDeck, onCardClick }
}

export default function CardGame({ tiles } : CardGameProps) {
  const { getDeck, onCardClick }: CardGameAPIType = useCardGameAPI(tiles)

  function elementKey(index: number) { return `card-${index}`}

  function renderDeck(deck: DeckProps) {
    return (
      <Board deck={deck} elementKeyFunction={elementKey} onCardClick={onCardClick} />
    )
  }

  return renderDeck(getDeck)
}