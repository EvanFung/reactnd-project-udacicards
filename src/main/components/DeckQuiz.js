import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"
import { getRandomInt } from "../utils/utils"
import Button from "./TouchableButton"
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
  //randomly pick up a question from deck.
  getRandomCard = () => {
    const questions = this.props.deck.questions
    const randomIndex = getRandomInt(0, questions.length)
    this.setState({
      currentCard: questions[randomIndex],
      cardCounter: this.state.cardCounter + 1
    })
  }

  componentWillMount() {
    this.getRandomCard()
  }

  onSubmitAnswer(isTrue) {
    const questions = this.props.deck.questions
    //update the score if selection is true
    if (isTrue) {
      this.setState({
          score: this.state.score + 1
      })
    }

    if (this.state.cardCounter <= NUMBER_QUESTIONS) {
      this.getRandomCard()
      return
    }
  }

  initialQuiz = () => {
    this.setState(
      {
        score: 0,
        cardCounter: 0,
        currentCard: null
      },
      this.getRandomCard
    )
  }

  render() {
    const { score, cardCounter, currentCard } = this.state
    if (!currentCard) {
      return null
    }
    if (cardCounter === NUMBER_QUESTIONS) {
      return <Button onPress={this.initialQuiz}>GAME COMPLETED</Button>
    }
    return (
      <View>
        <Text>
          Progress: {cardCounter} / {NUMBER_QUESTIONS}
        </Text>
        <Text>Current Score: {score}</Text>
        <Text>{currentCard.question}</Text>
        {currentCard.answers.map((answer, index) => (
          <Button
            key={index}
            onPress={() => this.onSubmitAnswer(answer.isTrue)}
          >
            {answer.text}
          </Button>
        ))}
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
export default connect(mapState)(DeckQuiz)
