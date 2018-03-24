import React from "react"
import { Platform } from "react-native"
import { TabNavigator } from "react-navigation"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import DeckList from "../components/DeckList"
import DeckForm from "../components/DeckForm"

import { lightBlue, paleBlue,white } from "../utils/colors"
const tabsItem = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards-playing-outline" size={30} color={tintColor} />
      )
    }
  },
  CreateDeck: {
    screen: DeckForm,
    navigationOptions: {
      tabBarLabel: "DeckForm",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="library-plus"
          size={30}
          color={tintColor}
        />
      )
    }
  }
}

const tabSettings = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? lightBlue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : lightBlue,
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

const Tabs = TabNavigator(tabsItem,tabSettings)
export default Tabs