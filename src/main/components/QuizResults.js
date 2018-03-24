import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"

export default function QuizResults({
  successRate,
  onBackClick,
  onReplyClick
}) {
  let icon, message
  if (successRate < 40) {
    icon = "emoticon-dead"
    message = `Oops! It seems as if you need to review more.`
  } else if (successRate < 50) {
    icon = "emoticon-sad"
    message = `Almost there!You can make it next time.`
  } else if (successRate < 70) {
    icon = "emoticon-happy"
    message = `Hey! You made it, make it better next time.`
  } else if (successRate < 90) {
    icon = "emoticon-excited"
    message = `Congratulation! You on the way to become a master on this.`
  } else {
    icon = "emoticon-cool"
    message = `Wow! You are definitely a master on this.`
  }
  return (
    <View>
      <Text>Obtained Score</Text>
      <Text>{successRate}%</Text>
      <Text>{message}</Text>
      <MaterialCommunityIcons name={icon} size={200} />
      <TouchableOpacity onPress={onReplyClick}>
        <MaterialCommunityIcons name={"restart"} size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackClick}>
        <MaterialCommunityIcons
          name={"cards"}
          size={50}
        />
      </TouchableOpacity>
    </View>
  )
}
