import mockDecks from "../../../resources/data/decks.json"
import { AsyncStorage } from "react-native"
const DECKS_STORAGE_KEY = "UdaciCards::DeckList"

export const decks = {
  state: initialState = {},
  reducers: {
    fetchDeckList(state,data) {
        return {
            ...state,
            ...data
        }
    }
  },
  effects: {
    async fetchDeckListAsync() {
        AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
            if(!data) {
                console.log(`no data`)
                const initialData = JSON.stringify(mockDecks)
                AsyncStorage.setItem(DECKS_STORAGE_KEY,initialData);
                this.fetchDeckList(mockDecks)
                
            }
            this.fetchDeckList(JSON.parse(data))
        })

    }
  }
}
