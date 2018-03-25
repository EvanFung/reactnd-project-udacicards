import React from "react"
import { connect } from "react-redux"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native"
import { getRandomInt, shuffleArray } from "../utils/utils"
import Button from "./TouchableButton"
import QuizResults from "./QuizResults"
import {
  red,
  white,
  lightBlue,
  lightGray,
  gray,
  paleBlue,
  green
} from "../utils/colors"
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/LocalNotifications"
import { MaterialCommunityIcons } from "@expo/vector-icons"
const NUMBER_QUESTIONS = 10
class DeckQuiz extends React.Component {
  state = {
    score: 0,
    cardCounter: 0,
    currentCard: null,
    showAnswer: false,
    animSlide: new Animated.Value(1),
    animRotationDeg: new Animated.Value(0)
  }

  //revealAnswer
  revealAnswer = () => {
    const flipAnimation = Animated.timing(this.state.animRotationDeg, {
      duration: 1000,
      toValue: 1
    })

    flipAnimation.start(() => {
      this.setState({
        showAnswer: true,
        animRotationDeg: new Animated.Value(0)
      })
    })
  }

  //randomly pick up a question from deck.
  getRandomCard = () => {
    const questions = this.props.deck.questions
    const randomIndex = getRandomInt(0, questions.length)
    shuffleArray(questions[randomIndex].answers)
    Animated.timing(this.state.animSlide, { duration: 100, toValue: 0 }).start(
      () => {
        this.setState(
          {
            showAnswer: false,
            currentCard: questions[randomIndex],
            cardCounter: this.state.cardCounter + 1
          },
          () => {
            Animated.timing(this.state.animSlide, {
              duration: 200,
              toValue: 1
            }).start()
          }
        )
      }
    )
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
  componentWillUpdate() {
    if (this.state.cardCounter === NUMBER_QUESTIONS) {
      this.props.navigation.setParams({ showResult: true })
      clearLocalNotification().then(setLocalNotification)
    }
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
          onReplyClick={this.initialQuiz}
        />
      )
    }
    const flip = this.state.animRotationDeg.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    })

    const slide = this.state.animSlide.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get("window").width, 0]
    })
    return (
      <View style={styles.container}>
        <View style={[styles.row]}>
          <MaterialCommunityIcons
            name="timer"
            size={30}
            style={styles.timerIcon}
          />
          <Text>
            Progress: {cardCounter} / {NUMBER_QUESTIONS}
          </Text>
        </View>
        <Animated.View
          style={{ flexGrow: 1, transform: [{ translateX: slide }] }}
        >
          <TouchableWithoutFeedback
            onPress={!showAnswer ? this.revealAnswer : null}
          >
            <Animated.View
              style={[styles.card, { transform: [{ rotateY: flip }] }]}
            >
              <MaterialCommunityIcons
                name="cards"
                size={150}
                style={styles.cardIcon}
              />
              <View style={{ flexGrow: 1, justifyContent: "center" }}>
                <Text style={styles.question}>{currentCard.question}</Text>
              </View>
              <MaterialCommunityIcons
                name={!showAnswer ? "eye" : "eye-outline"}
                size={30}
              />
              <Text
                style={{ color: lightGray, fontSize: 12, flexWrap: "wrap" }}
              >
                {!showAnswer
                  ? "Click card to reveal answer"
                  : "The answer has been revealed"}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <View style={{ marginTop: 30 }}>
          {currentCard.answers.map((answer, index) => (
            <Button
              key={index}
              onPress={() => this.onSubmitAnswer(answer.isTrue)}
              style={[
                styles.ansBtn,
                showAnswer && answer.isTrue ? { backgroundColor: green } : {}
              ]}
            >
              {answer.text}
            </Button>
          ))}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  card: {
    padding: 20,
    borderRadius: 5,
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightBlue
  },
  question: {
    color: white,
    fontSize: 14,
    flexWrap: "wrap",
    textAlign: "center"
  },
  timerIcon: {
    marginRight: 5,
    color: lightGray
  },
  ansBtn: {
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    textAlign: "center",
    color: white,
    fontSize: 16,
    backgroundColor: paleBlue,
    marginTop: 10
  },
  cardIcon: {
    color: lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
})
export default connect(mapState)(DeckQuiz)
