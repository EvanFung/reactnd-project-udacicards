import React from "react"
import { connect } from "react-redux"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native"
import { white } from "../utils/colors"
import DeckListItem from "./DeckListItem"
class DeckList extends React.Component {
  componentWillMount() {
    this.props.fetchDeckListAsync()
  }
  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {/* {Object.keys(decks).map((key, index) => {
          const deck = decks[key]
          return (
            <DeckListItem deck={deck} key={key} />
          )
        })} */}
        <FlatList
          data={Object.keys(decks)}
          renderItem={({ item }) => <DeckListItem deck={decks[item]} />}
          keyExtractor={item => item}
        />
      </View>
    )
  }
}
const mapState = state => {
  return {
    decks: state.decks
  }
}

const mapDispatch = dispatch => ({
  fetchDeckListAsync: () => dispatch.decks.fetchDeckListAsync()
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
})
export default connect(mapState, mapDispatch)(DeckList)
