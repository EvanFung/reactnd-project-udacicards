import React from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from "react-native"
import { connect } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import Button from "./TouchableButton"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import ValidationComponent from "react-native-form-validator"
import {
  white,
  lightGray,
  lightBlue,
  green,
  red,
  paleBlue
} from "../utils/colors"
class CardForm extends ValidationComponent {
  state = {
    question: "",
    answers: ["", "", ""],
    answer1: "",
    answer2: "",
    answer3: "",
    correctAnswer: 0,
    inputToFocus: null,
    activeForm: "question",
    animOpacity: new Animated.Value(1)
  }

  setCorrectAnswer = index => {
    this.setState({ correctAnswer: index })
  }
  componentDidMount() {
    this.refs.question.focus()
  }

  componentDidUpdate() {
    const { inputToFocus } = this.state
    if (inputToFocus && this.refs[inputToFocus]) {
      this.refs[inputToFocus].focus()
      this.setState({ inputToFocus: null })
    }
  }

  onSubmitCard = () => {
    this.validate({
      question: { required: true, minlength: 5, maxlength: 50 },
      answer1: { required: true, minlength: 5, maxlength: 50 },
      answer2: { required: true, minlength: 5, maxlength: 50 },
      answer3: { required: true, minlength: 5, maxlength: 50 }
    })

    const fieldNames = ["question", "answer1", "answer2", "answer3"]
    //loop through the field array to check if empty or not.
    for (let i = 0; i < fieldNames.length; i++) {
      if (this.isFieldInError(fieldNames[i])) {
        DeviceEventEmitter.emit(
          "showToast",
          this.getErrorsInField(fieldNames[i])
        )
        //fucus to this empty field
        this.setState({ inputToFocus: fieldNames[i] })
        return
      }
    }

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
      DeviceEventEmitter.emit("showToast", "Created a new card!")
      //Go back to last page
      this.props.navigation.goBack()
    })
  }

  render() {
    const { navigation, deck } = this.props
    const { deckId } = navigation.state.params
    const isQuestionFormActive = this.state.activeForm === "question"
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <MaterialCommunityIcons
            name="human-handsup"
            size={40}
            style={styles.icon}
          />
          <Text style={styles.title}>
            What's the question for your new card?
          </Text>
        </View>
        <TextInput
          style={styles.textInput}
          ref="question"
          value={this.state.question}
          onChangeText={question => this.setState({ question })}
          placeholder={`Question`}
        />
        <View style={{ marginTop: 20 }}>
          <View style={styles.textContainer}>
            <MaterialIcons
              name="question-answer"
              size={40}
              style={styles.icon}
            />
            <Text style={styles.title}>
              What's the answers for your new card?
            </Text>
          </View>
          {this.state.answers.map((item, index) => (
            <KeyboardAvoidingView key={index} style={styles.answerForm}>
              <TextInput
                style={[styles.textInput, { flexGrow: 1 }]}
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
                returnKeyType="next"
              />
              <TouchableOpacity onPress={() => this.setCorrectAnswer(index)}>
                <MaterialIcons
                  size={40}
                  name={this.state.correctAnswer === index ? "check" : "close"}
                  style={{
                    color: this.state.correctAnswer === index ? green : red
                  }}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          ))}
          <Button style={styles.addBtn} onPress={this.onSubmitCard}>
            Add card
          </Button>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: white,
    paddingTop: 30
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: lightGray,
    marginRight: 20
  },
  title: {
    fontSize: 18,
    color: lightBlue,
    fontSize: 20,
    flexShrink: 1,
    fontWeight: "bold"
  },
  textInput: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: lightGray,
    marginBottom: 20
  },
  answerForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  addBtn: {
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    textAlign: "center",
    color: white,
    fontSize: 16,
    backgroundColor: paleBlue,
    marginTop: 30
  }
})
export default connect(mapState, mapDispatch)(CardForm)
