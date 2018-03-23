import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Button from "./TouchableButton"
class DeckDetails extends React.Component {
  //override the default navigationOptions.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? `${params.deckId} details` : "A nesty details screen"
    }
  }

  render() {
    const { deck, navigation } = this.props
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length}</Text>
        <View>
          <Button
            onPress={() =>
              navigation.navigate("CreateCard", { deckId: deck.title })
            }
          >
            ADD CARD
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("DeckQuiz", { deckId: deck.title })
            }
          >
            START QUIZ
          </Button>
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
export default connect(mapState)(DeckDetails)
