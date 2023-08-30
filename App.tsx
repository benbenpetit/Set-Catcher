import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import _isEqual from 'lodash/isEqual'

const FILLINGS = ['SOLID', 'HATCHED', 'EMPTY']
const COLORS = ['GREEN', 'PURPLE', 'RED']
const SHAPES = ['OVAL', 'LOZENGE', 'WAVE']

type ICard = {
  filling: string
  color: string
  shape: string
  size: number
}

const App = () => {
  const [combinations, setCombinations] = useState(0)

  const generateCards = (n: number) => {
    let i = 0
    let cards: ICard[] = []

    while (i < n) {
      const newCard: ICard = {
        filling: FILLINGS[Math.floor(Math.random() * 3)],
        color: COLORS[Math.floor(Math.random() * 3)],
        shape: SHAPES[Math.floor(Math.random() * 3)],
        size: Math.floor(Math.random() * 3),
      }

      if (cards.every((currentCard) => !_isEqual(currentCard, newCard))) {
        cards.push(newCard)
        i++
      }
    }

    return cards
  }

  const findLastCard = (x: ICard, y: ICard) => {
    const filling =
      x.filling === y.filling
        ? x.filling
        : FILLINGS.find((filling) => ![x.filling, y.filling].includes(filling))
    const color =
      x.color === y.color
        ? x.color
        : COLORS.find((color) => ![x.color, y.color].includes(color))
    const shape =
      x.shape === y.shape
        ? x.shape
        : SHAPES.find((shape) => ![x.shape, y.shape].includes(shape))
    const size =
      x.size === y.size
        ? x.size
        : [0, 1, 2].find((size) => ![x.size, y.size].includes(size))

    return { filling, color, shape, size }
  }

  const computeCombinations = () => {
    const defaultCards = generateCards(9)
    let nSets = 0

    for (let i = 0; i < defaultCards.length; i++) {
      const currentCard = defaultCards[i]
      const cardsWithoutCurrentCard = defaultCards.filter((_, index) => index !== i)

      for (let j = 0; j < cardsWithoutCurrentCard.length - 1; j++) {
        const secondCard = cardsWithoutCurrentCard[j]
        const lastCard = findLastCard(currentCard, secondCard)

        if (defaultCards.some((card) => _isEqual(card, lastCard))) {
          nSets++
        }
      }
    }

    setCombinations(nSets)
  }

  return (
    <View style={styles.container}>
      <Text>{combinations}</Text>
      <Pressable
        onPress={computeCombinations}
        style={{
          backgroundColor: 'blue',
          padding: 8,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: 'white' }}>Rechercher</Text>
      </Pressable>
      <StatusBar style='auto' />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
