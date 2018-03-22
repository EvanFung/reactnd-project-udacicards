import React from "react"
import { View, Text } from "react-native"
import { connect } from "react-redux"

class CardForm extends React.Component {
  render() {
    const { navigation } = this.props
    const { deckId } = navigation.state.params
    return (
      <View>
        <Text>{deckId}</Text>
      </View>
    )
  }
}

export default CardForm
