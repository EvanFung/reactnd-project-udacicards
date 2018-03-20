import mockDecks from "../../../resources/data/decks.json";
const initialState = mockDecks

export const decks = {
    state: initialState,
    reducers: {
        fetchDeckList(state) {
            return state;
        }
    }
}