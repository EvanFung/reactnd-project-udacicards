import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

class DeckDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? `${params.deckId} details` : "A nesty details screen"
    }
  }
  render() {
    const { deck,navigation } = this.props
    return (
      <View>
        <Text>deck details page</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('CreateCard',{deckId: deck.title})}>
            <Text>ADD CARD</Text>
          </TouchableOpacity>
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
