import React from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native"
import { connect } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import Button from "./TouchableButton"
import ValidationComponent from "react-native-form-validator"
class CardForm extends ValidationComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: `Create new card in ${deckId}`
    }
  }
  state = {
    question: "",
    answers: ["", "", ""],
    answer1: "",
    answer2: "",
    answer3: "",
    correctAnswer: 0
  }

  setCorrectAnswer = index => {
    this.setState({ correctAnswer: index })
  }

  onSubmitCard = () => {
    this.validate({
      question: { required: true, minlength: 5, maxlength: 50 },
      answer1: { required: true, minlength: 5, maxlength: 50 },
      answer2: { required: true, minlength: 5, maxlength: 50 },
      answer3: { required: true, minlength: 5, maxlength: 50 }
    })

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

    if (!this.isFormValid()) {
      DeviceEventEmitter.emit("showToast", this.getErrorMessages())
      return
    }
    //if all the things go well, emmit an add card action
    this.props.addCardToDeck(item).then(() => {
      DeviceEventEmitter.emit("showToast", "Created a new card!")
      //Go back to last page
      this.props.navigation.goBack()
    })
  }

  render() {
    const { navigation, deck } = this.props
    const { deckId } = navigation.state.params

    return (
      <View style={{ flex: 1 }}>
        <Text>Write possible answer for your question at least 2</Text>
        <TextInput
          ref="question"
          value={this.state.question}
          onChangeText={question => this.setState({ question })}
          placeholder={`Question`}
        />
        <View>
          {this.state.answers.map((item, index) => (
            <View key={index}>
              <TextInput
                ref={`answer${index + 1}`}
                value={this.state.answers[index]}
                placeholder={`Answer ${index + 1}`}
                onChangeText={answer => {
                  const updateAnswers = this.state.answers
                  updateAnswers[index] = answer
                  this.setState({
                    answers: updateAnswers,
                    [`answer${index + 1}`]: answer
                  })
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
