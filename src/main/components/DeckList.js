import React from "react"
import { connect } from "react-redux"
import { View, Text, TouchableOpacity } from "react-native"
class DeckList extends React.Component {
  componentWillMount() {
    this.props.fetchDeckListAsync();
  }
  render() {
    const { decks } = this.props
    return (
      <View>
        {Object.keys(decks).map((key, index) => {
          const deck = decks[key]
          return (
            <TouchableOpacity key={key} onPress={() => console.log(`clicked ${deck.title}`)}>
              <Text>
                {deck.title}
              </Text>
              <Text>
                {deck.questions.length} questions.
              </Text>
            </TouchableOpacity>
          )
        })}
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
export default connect(mapState,mapDispatch)(DeckList)
