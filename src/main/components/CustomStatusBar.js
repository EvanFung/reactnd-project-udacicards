import React from "react"
import { Constants } from "expo"
import { View, StatusBar, StyleSheet } from "react-native"
import { white } from "../utils/colors"

export default function CustomStatusBar() {
  return (
    <View style={styles.statusBarContainer}>
      <StatusBar translucent barStyle="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  statusBarContainer: {
    backgroundColor: white,
    height: Constants.statusBarHeight
  }
})
