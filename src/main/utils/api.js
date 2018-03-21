import { AsyncStorage } from "react-native"
const DECKS_STORAGE_KEY = "UdaciCards::DeckList"

export function fetchDeckList() {
    let result = null
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
        return result = JSON.parse(data)
    })
}

export async function setAsyncStorage(item) {
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, item)
}
