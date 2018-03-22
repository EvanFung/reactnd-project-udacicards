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
    },
    addCardToDeck(state, data) {
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
        this.fetchDeckList(JSON.parse(data))
      })
    },
    async addNewDeckAsync(title) {
      const deck = {
        [title]: {
          title,
          questions: []
        }
      }
      //update db
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
      //update store
      this.addNewDeck(deck)
    },
    async addCardToDeckAsync(item) {
      const {deck, card} = item
      let newDeck = {
        [deck.title]: {
          ...deck,
          questions: [
            ...deck.questions,
            card
          ]
        }
      }
      console.log(newDeck)
      // //update db
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
      // //update store
      this.addCardToDeck(newDeck)
    }
  }
}
