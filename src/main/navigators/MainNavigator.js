import React from "react"
import { Platform } from "react-native"
import { StackNavigator } from "react-navigation"
import Tabs from "./Tabs"
import DeckDetails from "../components/DeckDetails"
import CardForm from "../components/CardForm"
import QuizResults from "../components/QuizResults"
import DeckQuiz from "../components/DeckQuiz"

import { lightBlue, white } from "../utils/colors"

const defaultNavigationOptions = {
  headerTintColor: white,
  headerBackTitle: "Back",
  headerStyle: {
    backgroundColor: lightBlue
  }
}

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: defaultNavigationOptions
    },
    DeckDetails: {
      screen: DeckDetails,
      navigationOptions: {
        ...defaultNavigationOptions,
        title: "Deck details"
      }
    },
    CreateCard: {
      screen: CardForm,
      navigationOptions: {
        ...defaultNavigationOptions,
        title: "Add new card"
      }
    },
    DeckQuiz: {
      screen: DeckQuiz,
      navigationOptions: {
        ...defaultNavigationOptions,
        title: "Quiz"
      }
    },
    QuizResults: {
      screen: QuizResults,
      navigationOptions: {
        ...defaultNavigationOptions,
        title: "Quiz results"
      }
    }
  },
  {
    headerMode: Platform.OS === "ios" ? "float" : "screen"
  }
)
export default MainNavigator
