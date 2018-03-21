import React from "react"
import { connect } from "react-redux"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AlertIOS,
  KeyboardAvoidingView
} from "react-native"
import { white } from "../utils/colors";
class DeckFrom extends React.Component {
  state = {
    title: ""
  }
  onSubmitDeck = () => {
    const { title } = this.state
    console.log(`Adding new deck with ${title}`)
    if (!title) {
      console.log(`You need to specify a name for the deck`)
    //   AlertIOS.alert('Enter a value',null); it works when dont using expo.
      return
    }

    if (this.props.decks[title]) {
      console.log(`A deck with this name already exists!`)
      return
    }

    this.props.addNewDeck(title).then(() => {
      this.setState({ title: "" })
      this.props.navigation.navigate('DeckList')
      console.log(`A new deck created.`)
    })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.center}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          placeholder="Deck title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity onPress={this.onSubmitDeck}>
          <Text>create deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
})
export default connect(mapState, mapDipatch)(DeckFrom)
