import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { preventDefault } from '../../utils';
import { v4 } from 'uuid';
import { CardApiType, CardProps as Card } from './Card'
import Board from './Board';
import { DeckProps } from './Deck';


function buildCards(images: string[]): DeckProps {
  return images.map((imagePath: string) => (
    {
      imagePath,
      id: v4(),
      index: 0,
      state: "hidden",
      onDragStart: preventDefault,
      onDrop: preventDefault,
    }
  ))
}

type CardGameProps = {
  images: string[]
}

type CardGameAPIType = {
  deck: DeckProps;
  onCardClick: (deck: DeckProps) => (e: BaseSyntheticEvent, cardId: string, cardApi: CardApiType) => BaseSyntheticEvent;
}

const useCardGameAPI = (images: string[]) => {
  const [getDeck, setDeck] = useState<DeckProps>([])

  function processCard(e: BaseSyntheticEvent, card: Card, deck: DeckProps, cardApi: CardApiType): Card[] {
    return deck.map((_card: Card) => {
      if (_card.id === card.id) {
        if (card.state === "hidden") {
          cardApi.showCard(e.target.parentNode)
          return {...card, state: "visible"}
        } else {
          cardApi.hideCard(e.target.parentNode)
          return {...card, state: "hidden"}
        }
      } else {
        return _card
      }
    })
  }

  function findCard(deck: DeckProps, cardId: string): Card | undefined {
    return deck.find((card: Card) => card.id === cardId)
  }

  const onCardClick = (deck: DeckProps) => (e: BaseSyntheticEvent, cardId: string, cardApi: CardApiType): BaseSyntheticEvent => {
    const card: Card | undefined = findCard(deck, cardId)
    const updatedDeck = processCard(e, card!, deck, cardApi)

    setDeck(updatedDeck)

    return e
  }

  const cards: Card[] = buildCards(images)

  useEffect(() => {
    setDeck(cards)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  return { deck: getDeck, onCardClick }
}

export default function CardGame({ images } : CardGameProps) {
  const [getDeck, setDeck] = useState<DeckProps>([])
  const { deck, onCardClick }: CardGameAPIType = useCardGameAPI(images)

  useEffect(() => {
    setDeck(deck)
  }, [deck])

  function elementKey(index: number) { return `card-${index}`}

  function renderDeck(deck: DeckProps) {
    return (
      <Board deck={deck} elementKeyFunction={elementKey} onCardClick={onCardClick} />
    )
  }

  return renderDeck(getDeck)
}