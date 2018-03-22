import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

class DeckQuiz extends React.Component {
  //override the default navigationOptions.
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: `Deck Quiz`
    }
  }
  render() {
    return (
      <View>
        <Text>Deck Quiz</Text>
      </View>
    )
  }
}

export default DeckQuiz
