import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Button from "./TouchableButton"
import { white, paleBlue, lightBlue, lightGray } from "../utils/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
class DeckDetails extends React.Component {
  render() {
    const { deck, navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <MaterialCommunityIcons
            name="cards"
            size={200}
            style={{ color: lightGray, marginTop: -40 }}
          />
          <Text style={styles.title}>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>
        <View>
          <Button
            onPress={() =>
              navigation.navigate("CreateCard", { deckId: deck.title })
            }
            style={styles.button}
          >
            ADD CARD
          </Button>
          {deck.questions.length > 0 && (
            <Button
              onPress={() =>
                navigation.navigate("DeckQuiz", { deckId: deck.title })
              }
              style={styles.button}
            >
              START QUIZ
            </Button>
          )}
        </View>
      </View>
    )
  }
}
const mapState = (state, { navigation }) => {
  const { deckId } = navigation.state.params
  return {
    deck: state.decks[deckId]
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: "center"
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    textAlign: "center",
    color: white,
    fontSize: 16,
    backgroundColor: paleBlue
  },
  title: {
    color: lightBlue,
    fontSize: 40
  },
  textContainer: {
    alignItems: "center"
  }
})
export default connect(mapState)(DeckDetails)
