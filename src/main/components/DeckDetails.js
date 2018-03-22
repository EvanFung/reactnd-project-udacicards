import React from "react"
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

class DeckDetails extends React.Component {
  static navigationOptions = ({navigation}) => {
      const {params} = navigation.state
      return {
          title: params ? `${params.deckId} details` : 'A nesty details screen'
      }
  }
  render() {
    return (
      <View>
        <Text>deck details page</Text>
      </View>
    )
  }
}

export default DeckDetails
