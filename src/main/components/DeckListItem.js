import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function DeckListItem({ deck, navigation}) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('DeckDetails',{deckId: deck.title})}
      >
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} questions.</Text>
      </TouchableOpacity>
    </View>
  )
}
