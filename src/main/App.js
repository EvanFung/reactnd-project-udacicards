import React from "react"
import { View, DeviceEventEmitter } from "react-native"
import { init } from "@rematch/core"
import * as models from "./models"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import Reactotron from "reactotron-react-native"
import { AsyncStorage } from "react-native"
import { white, gray } from "./utils/colors"
import CustomStatusBar from "./components/CustomStatusBar"
import Toast, { DURATION } from "react-native-easy-toast"
import MainNavigator from "./navigators/MainNavigator"
import { setLocalNotification } from "./utils/LocalNotifications"
const store = init({
  models,
  redux: {
    //hook up the devtool store subscription
    createStore: Reactotron.createStore,
    middlewares: [thunk]
  }
})

export default class App extends React.Component {
  //set up a showToast listener so that we can globally emmit a toast action
  componentDidMount() {
    setLocalNotification()
    this.listener = DeviceEventEmitter.addListener("showToast", text => {
      this.refs.toastWithStyle.show(text, DURATION.LENGTH_LONG)
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
              fontSize: 13,
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
