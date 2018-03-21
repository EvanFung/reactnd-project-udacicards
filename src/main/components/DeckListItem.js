import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function DeckListItem({ deck }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => console.log(`clicked ${deck.title}`)}
      >
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} questions.</Text>
      </TouchableOpacity>
    </View>
  )
}
