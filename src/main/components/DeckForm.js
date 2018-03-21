import React from "react"
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, TextInput } from "react-native"

class DeckFrom extends React.Component {
  state = {
    title: ""
  }
  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            placeholder="Deck title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <Text>create deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapState = state => {
  return {
    decks: state.decks
  }
}

const mapDipatch = dispatch => {}

export default connect()(DeckFrom)
