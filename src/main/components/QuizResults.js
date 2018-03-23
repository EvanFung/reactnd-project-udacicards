import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons"

export default function QuizResults() {
  return (
    <View>
      <Text>Obtained Score</Text>
      <Text>Obtained Score</Text>
      <TouchableOpacity>
        <Entypo name={"reply"} size={50} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name={"cards"} size={50} />
      </TouchableOpacity>
    </View>
  )
}
