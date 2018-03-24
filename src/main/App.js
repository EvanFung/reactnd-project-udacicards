import React from "react"
import { Constants } from "expo"
import {
  StyleSheet,
  Text,
  View,
  Platform,
  DeviceEventEmitter
} from "react-native"
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
import { purple, white, green, gray,palegreen } from "./utils/colors"
import DeckForm from "./components/DeckForm"
import DeckDetails from "./components/DeckDetails"
import CustomStatusBar from "./components/CustomStatusBar"
import CardForm from "./components/CardForm"
import DeckQuiz from "./components/DeckQuiz"
import Toast, { DURATION } from "react-native-easy-toast"
import Tabs from "./navigators/Tabs";
import { setLocalNotification } from './utils/LocalNotifications';
const store = init({
  models,
  redux: {
    //hook up the devtool store subscription
    createStore: Reactotron.createStore,
    middlewares: [thunk]
  }
})
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerBackTitle: "Back"
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
        height: Constants.statusBarHeight

      }
    }
  },
  CreateCard: {
    screen: CardForm,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})
export default class App extends React.Component {
  //set up a showToast listener so that we can globally emmit a toast action
  componentDidMount() {
    setLocalNotification();
    this.listener = DeviceEventEmitter.addListener("showToast", text => {
      this.refs.toastWithStyle.show(text,DURATION.LENGTH_LONG)
    })
  }
  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove()
    }
  }
  render() {
    // AsyncStorage.clear(); 
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar />
          <MainNavigator />
          <Toast
            ref="toastWithStyle"
            style={{ backgroundColor: white }}
            textStyle={{
              fontSize: 20,
              color: gray,
              fontWeight: "bold"
            }}
            position={"center"}
          />
        </View>
      </Provider>
    )
  }
}
