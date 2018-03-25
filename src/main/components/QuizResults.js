import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"
import { white, red, green, lightBlue } from "../utils/colors"

export default function QuizResults({
  successRate,
  onBackClick,
  onReplyClick
}) {
  let icon
  if (successRate < 40) {
    icon = "emoticon-dead"
  } else if (successRate < 50) {
    icon = "emoticon-sad"
    message = `Almost there!You can make it next time.`
  } else if (successRate < 70) {
    icon = "emoticon-happy"
  } else if (successRate < 90) {
    icon = "emoticon-excited"
  } else {
    icon = "emoticon-cool"
  }
  return (
    <View style={styles.container}>
      <Text>Hey! Your Score is</Text>
      <Text style={styles.score}>{successRate.toFixed(1)}%</Text>
      <MaterialCommunityIcons name={icon} size={200} />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={onReplyClick} style={styles.icon}>
          <MaterialCommunityIcons
            name={"replay"}
            size={50}
            style={{ color: white }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onBackClick}
          style={[styles.icon, { backgroundColor: red }]}
        >
          <MaterialCommunityIcons
            name={"exit-to-app"}
            size={50}
            style={{ color: white }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white
  },
  btnContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around"
  },
  icon: {
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: green
  },
  score: {
    fontSize: 35,
    color: lightBlue,
    fontWeight: "bold"
  },
})
