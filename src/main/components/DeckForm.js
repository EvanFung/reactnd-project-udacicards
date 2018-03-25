import React from "react"
import { connect } from "react-redux"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AlertIOS,
  KeyboardAvoidingView,
  DeviceEventEmitter
} from "react-native"
import Button from "./TouchableButton";
import { white, lightGray, lightBlue, green, paleBlue } from "../utils/colors";
import ValidationComponent from "react-native-form-validator"
import { NavigationActions } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
class DeckFrom extends ValidationComponent {
  state = {
    title: ""
  }
  onSubmitDeck = () => {
    const { title } = this.state
    console.log(`Adding new deck with ${title}`)
    if (!title) {
      DeviceEventEmitter.emit("showToast", "You need to specify a name for the deck")
    //   AlertIOS.alert('Enter a value',null); it works when dont using expo.
      return
    }

    if (this.props.decks[title]) {
      DeviceEventEmitter.emit("showToast", "A deck with this name already exists!")
      return
    }

    this.props.addNewDeck(title).then(() => {
      DeviceEventEmitter.emit("showToast", "Created a new deck!")
      this.setState({ title: "" })
      // this.props.navigation.navigate('DeckList')
      const resetAction = NavigationActions.reset({
        index: 1,
        actions:[
          NavigationActions.navigate({routeName: 'Home'}),
          NavigationActions.navigate({routeName: 'DeckDetails',params: {deckId: title}})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.textContainer}>
          <MaterialCommunityIcons name="human-handsup"  size={80} style={styles.icon} />
          <Text style={styles.text}>What is the title of your new deck?</Text>
        </View>
        <TextInput
          placeholder="Deck title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          style={styles.textInput}
        />
        <Button onPress={this.onSubmitDeck} style={styles.createBtn} >CREATE DECK</Button>
      </KeyboardAvoidingView>
    )
  }
}

const mapState = state => {
  return {
    decks: state.decks
  }
}

const mapDispatch = dispatch => {
  return {
    addNewDeck: title => dispatch.decks.addNewDeckAsync(title)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon:  {
    color: lightGray,
  },
  text: {
    color: lightBlue,
    fontSize: 20,
    flexShrink: 1,
    marginVertical: 30
  },
  textInput: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderColor: lightGray
  },
  createBtn: {
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    textAlign:"center",
    color: white,
    fontSize: 16,
    backgroundColor: paleBlue
  }
})

export default connect(mapState, mapDispatch)(DeckFrom)
