import React from "react"
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, TextInput } from "react-native"

class DeckFrom extends React.Component {
  state = {
    title: ""
  }
  onSubmitDeck = () => {
    console.log(`Adding new deck with ${this.state.title}`)
    if (this.state.title !== "") {
      this.props.addNewDeck(this.state.title).then(() => {
        this.setState({ title: "" })
      })
    }
  }
  render() {
    const { addNewDeck } = this.props
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          placeholder="Deck title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity onPress={this.onSubmitDeck}>
          <Text>create deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const mapDipatch = dispatch => {
  return {
    addNewDeck: title => dispatch.decks.addNewDeckAsync(title)
  }
}

export default connect(null, mapDipatch)(DeckFrom)
