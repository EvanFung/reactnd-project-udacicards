import mockDecks from "../../../resources/data/decks.json";

const initialState = mockDecks

function decks (state=initialState,action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default decks