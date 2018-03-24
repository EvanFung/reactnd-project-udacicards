import React from "react"
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
import { purple, white, green, gray } from "./utils/colors"
import DeckForm from "./components/DeckForm"
import DeckDetails from "./components/DeckDetails"
import CustomStatusBar from "./components/CustomStatusBar"
import CardForm from "./components/CardForm"
import DeckQuiz from "./components/DeckQuiz"
import Toast, { DURATION } from "react-native-easy-toast"
import { setLocalNotification } from './utils/LocalNotifications';
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
        backgroundColor: purple
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
    this.listener = DeviceEventEmitter.addListener("showToast", text => {
      this.refs.toastWithStyle.show(text,DURATION.LENGTH_LONG)
    })
    setLocalNotification();
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
