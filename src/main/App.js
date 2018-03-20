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
    //hook up the devtool store subscription
    createStore: Reactotron.createStore,
  }
})
export default class App extends React.Component {
  render() {
    Reactotron.log('hello world')
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList />
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
