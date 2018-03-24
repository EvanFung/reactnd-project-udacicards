import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"

export default function QuizResults({successRate,onBackClick,onReplyClick}) {
  return (
    <View>
      <Text>Obtained Score</Text>
      <Text>{successRate}%</Text>
      <TouchableOpacity onPress={onReplyClick}>
        <Entypo name={"reply"} size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackClick}>
        <MaterialCommunityIcons name={"cards"} size={50} onPress={onBackClick} />
      </TouchableOpacity>
    </View>
  )
}
