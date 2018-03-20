export const FETCH_DECK_LIST = 'deck/fetch_deck_list'
export const ADD_NEW_DECK = 'deck/add_new_deck'

/**
 * Action creator
 */

 export function fetchDeckList(decks) {
     return {
         type:FETCH_DECK_LIST,
         decks
     }
 }