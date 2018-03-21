import mockDecks from "../../../resources/data/decks.json"
import { AsyncStorage } from "react-native"
import { generateRandomId } from "../utils/utils"
const DECKS_STORAGE_KEY = "UdaciCards::DeckList"

export const decks = {
  state: (initialState = {}),
  reducers: {
    fetchDeckList(state, data) {
      return {
        ...state,
        ...data
      }
    },
    addNewDeck(state, data) {
        return {
            ...state,
            ...data
        }
    }
  },
  effects: {
    async fetchDeckListAsync() {
      AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data => {
        if (!data) {
          console.log(
            `there's no data in AsyncStorage, initializing data from json file.`
          )
          const initialData = JSON.stringify(mockDecks)
          AsyncStorage.setItem(DECKS_STORAGE_KEY, initialData)
          this.fetchDeckList(mockDecks)
        }
        console.log(JSON.parse(data))
        this.fetchDeckList(JSON.parse(data))
      })
    },
    async addNewDeckAsync(title) {
      const deck = {
        [generateRandomId()]: {
          title,
          questions: []
        }
      }
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
      this.addNewDeck(deck);
    }
  }
}
