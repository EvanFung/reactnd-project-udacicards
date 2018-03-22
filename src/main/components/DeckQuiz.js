import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

const NUMBER_QUESTIONS = 10
class DeckQuiz extends React.Component {
  state = {
    score: 0,
    cardCounter: 0,
    currentCard: null
  }
  //override the default navigationOptions.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: `Deck Quiz`
    }
  }

  render() {
    const { score, cardCounter, currentCard } = this.state
    return (
      <View>
        <Text>
          Progress: {cardCounter} / {NUMBER_QUESTIONS}
        </Text>
        <Text>Current Score: {score}</Text>
      </View>
    )
  }
}
function mapState(state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: state.decks[deckId]
  }
}
export default DeckQuiz
