import { BaseSyntheticEvent } from "react"
import { CardApiType, t as CardT } from "./Card"

export type t = {
  cards: CardT[],
  selectedCards: CardT[]
}

function init(): t {
  return {
    cards: [],
    selectedCards: []
  }
}

function cardsSet(cards: CardT[]): CardT[] {
  return Array.from(cards).filter((member: CardT, index: number, self: CardT[]) =>
    self.findIndex(m => m.id === member.id) === index);
}

function processCard(e: BaseSyntheticEvent, card: CardT, deck: t, cardApi: CardApiType): t {
  
  const selectedCards = cardsSet([...deck.selectedCards, card])
  
  let initialAcc = {...deck, selectedCards}
  const processedDeck = Object.keys(deck).reduce((acc: t, value: string): t => {
    let _acc = {...acc}
    switch (value) {
      case "cards":
        const cards = deck.cards.map((_card: CardT) => {
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
        _acc = {..._acc, cards}
        break;

      case "selectedCards":
        switch (selectedCards.length) {
          case 0:
            console.log("no selected cards: ", selectedCards)
            break;

          case 1:
            console.log("one selected card: ", selectedCards)
            break

          case 2:
            console.log("two selected cards ", selectedCards)
            break

        }
        _acc = {..._acc, selectedCards: [...selectedCards]}
        break
    }
    return _acc
  }, initialAcc)

  console.log(":: Deck :: ", processedDeck)

  return processedDeck
}

export function Deck() {
  return {
    init,
    processCard
  }
}