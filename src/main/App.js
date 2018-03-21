import React from "react"
import { StyleSheet, Text, View, Platform } from "react-native"
import { init } from "@rematch/core"
import * as models from "./models"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import Reactotron from "reactotron-react-native"
import DeckList from "./components/DeckList"
import ReactotronConfig from "./ReactotronConfig"
import { AsyncStorage } from "react-native"
import { TabNavigator, StackNavigator } from "react-navigation"
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Foundation
} from "@expo/vector-icons"
import { purple, white } from "./utils/colors"
import DeckForm from "./components/DeckForm";
const store = init({
  models,
  redux: {
    //hook up the devtool store subscription
    createStore: Reactotron.createStore,
    middlewares: [thunk]
  }
})
const tabsItem = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "DeckList",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="library" size={30} color={tintColor} />
      )
    }
  },
  CreateDeck: {
    screen: DeckForm,
    navigationOptions: {
      tabBarLabel: "DeckForm",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="library-plus" size={30} color={tintColor} />
      )
    }
  }
}

const tabSettings = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0,0,0,24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
const Tabs = TabNavigator(tabsItem, tabSettings)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Tabs />
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
