import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { getRandomInt, shuffleArray } from "../utils/utils"
import Button from "./TouchableButton"
import QuizResults from "./QuizResults"
import { red } from "../utils/colors"
const NUMBER_QUESTIONS = 10
class DeckQuiz extends React.Component {
  state = {
    score: 0,
    cardCounter: 0,
    currentCard: null,
    showAnswer: false
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
      cardCounter: this.state.cardCounter + 1,
      showAnswer: false
    })
  }

  handleShowAnswer = () => {
    this.setState({
      showAnswer: true
    })
    //TODO: animate card flip here.
  }

  componentWillMount() {
    this.getRandomCard()
  }

  onSubmitAnswer(isTrue) {
    const questions = this.props.deck.questions
    //update the score if selection is true
    if (isTrue && !this.state.showAnswer) {
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
    this.props.navigation.setParams({ showResult: false })
  }

  render() {
    const { score, cardCounter, currentCard, showAnswer } = this.state
    if (!currentCard) {
      return null
    }
    if (cardCounter > NUMBER_QUESTIONS) {
      return (
        <QuizResults
          successRate={score / NUMBER_QUESTIONS * 100}
          onBackClick={() => this.props.navigation.goBack()}
          onReplyClick={() => this.initialQuiz}
        />
      )
    }
    return (
      <View>
        <Text>
          Progress: {cardCounter} / {NUMBER_QUESTIONS}
        </Text>
        <Text>Current Score: {score}</Text>
        <TouchableOpacity onPress={this.handleShowAnswer}>
          <Text>{currentCard.question}</Text>
        </TouchableOpacity>
        {currentCard.answers.map((answer, index) => (
          <Button
            key={index}
            onPress={() => this.onSubmitAnswer(answer.isTrue)}
            style={showAnswer && !answer.isTrue ? { backgroundColor: red } : {}}
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
