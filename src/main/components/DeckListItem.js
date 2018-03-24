import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { white, gray, lightGray, green, pink, lightGreen, lightYellow, blue, purple, palegreen } from "../utils/colors"
import UserAvatar from "react-native-user-avatar"
export default function DeckListItem({ deck, navigation, index }) {
  let event = index % 2 === 0
  return (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => navigation.navigate("DeckDetails", { deckId: deck.title })}
    >
      <View style={styles.text}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={{color: gray}}>{deck.questions.length} cards.</Text>
      </View>
      <View>
        <UserAvatar size="70" name={`${deck.title}`} />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowColor: "rgba(0,0,0,24)",
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  text: {
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 10
  }
})
