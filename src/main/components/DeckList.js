import React from "react"
import { connect } from "react-redux"
import { View, Text } from "react-native"
class DeckList extends React.Component {
  render() {
    const { decks } = this.props
    return (
      <View>
        <Text>abc{JSON.stringify(decks)}</Text>
      </View>
    )
  }
}
const mapState = state => {
  return {
    decks: state
  }
}
export default connect(mapState)(DeckList)
