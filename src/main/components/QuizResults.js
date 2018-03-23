import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"

export default function QuizResults({successRate}) {
  return (
    <View>
      <Text>Obtained Score</Text>
      <Text>{successRate}%</Text>
      <TouchableOpacity>
        <Entypo name={"reply"} size={50} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name={"cards"} size={50} />
      </TouchableOpacity>
    </View>
  )
}
