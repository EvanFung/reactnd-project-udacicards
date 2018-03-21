import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { init } from "@rematch/core"
import * as models from "./models"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import Reactotron from "reactotron-react-native"
import DeckList from "./components/DeckList"
import DeckFrom from "./components/DeckForm"
import ReactotronConfig from "./ReactotronConfig"
import { AsyncStorage } from "react-native"
import {TabNavigator, StackNavigator} from 'react-navigation'
const store = init({
  models,
  redux: {
    //hook up the devtool store subscription
    createStore: Reactotron.createStore,
    middlewares: [thunk]
  }
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <DeckList /> */}
          <DeckFrom />
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
