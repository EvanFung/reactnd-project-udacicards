import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { init } from "@rematch/core"
import * as models from "./models"
import { Provider } from "react-redux"
import Reactotron from "reactotron-react-native"
import DeckList from "./components/DeckList"
import ReactotronConfig from './ReactotronConfig'
const store = init({
  models,
  redux: {
    createStore: Reactotron.createStore,//hook up the devtool store subscription
  }
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList />
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
