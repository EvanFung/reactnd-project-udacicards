import React from "react"
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, TextInput } from "react-native"

class DeckFrom extends React.Component {
  state = {
    title: ""
  }
  onSubmitDeck = () => {
    const {title} = this.state
    console.log(`Adding new deck with ${title}`)
    if (!title) {
        console.log(`You need to specify a name for the deck`)
        return
    }

    if(this.props.decks[title]) {
        console.log(`A deck with this name already exists!`)
        return
    }

    this.props.addNewDeck(title).then(() => {
        this.setState({ title: "" })
        console.log(`A new deck created.`)
      })
  }
  render() {
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

const mapState = state => {
    return {
      decks: state.decks
    }
}

const mapDipatch = dispatch => {
  return {
    addNewDeck: title => dispatch.decks.addNewDeckAsync(title)
  }
}

export default connect(mapState, mapDipatch)(DeckFrom)
