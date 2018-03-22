import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import Button from "./TouchableButton"
class CardForm extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `Create new card in ${deckId}`
    }
  }
  state = {
    question: "",
    answers: ["", "", ""],
    correctAnswer: 0
  }

  setCorrectAnswer = index => {
    this.setState({ correctAnswer: index })
  }

  onSubmitCard = () => {
    //TODO:form validation
    const card = {
      question: this.state.question,
      answers: this.state.answers.map((answer, index) => ({
        text: answer,
        isTrue: this.state.correctAnswer === index
      }))
    }
    const item = {
      deck: this.props.deck,
      card: card
    }
    //if all the things go well, emmit an add card action
    this.props.addCardToDeck(item).then(() => {
      //Go back to last page
      this.props.navigation.goBack()
      //TODO: Change the console to alertIOS later.
      console.log(`New card added to deck`)
    })
  }

  render() {
    const { navigation, deck } = this.props
    const { deckId } = navigation.state.params

    return (
      <View>
        <Text>Write possible answer for your question at least 2</Text>
        <TextInput
          value={this.state.question}
          onChangeText={question => this.setState({ question })}
          placeholder={`Question`}
        />
        <View>
          {this.state.answers.map((item, index) => (
            <View key={index}>
              <TextInput
                value={this.state.answers[index]}
                placeholder={`Answer ${index + 1}`}
                onChangeText={answer => {
                  const updateAnswers = this.state.answers
                  updateAnswers[index] = answer
                  this.setState({ answers: updateAnswers })
                }}
              />
              <TouchableOpacity onPress={() => this.setCorrectAnswer(index)}>
                <Ionicons
                  name={
                    this.state.correctAnswer === index
                      ? "ios-radio-button-on"
                      : "ios-radio-button-off"
                  }
                />
              </TouchableOpacity>
            </View>
          ))}
          <Button onPress={this.onSubmitCard}>Add card</Button>
        </View>
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
const mapDispatch = dispatch => {
  return {
    addCardToDeck: item => dispatch.decks.addCardToDeckAsync(item)
  }
}
export default connect(mapState, mapDispatch)(CardForm)
