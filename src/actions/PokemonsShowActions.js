const initialState = {
  year: 2016,
  photos: []
}

export default function next_pokemons(state = initialState, action) {

  switch (action.type) {
    case 'NEXT_POKEMONS':
      return { ...state, year: action.payload }

    default:
      return state;
  }

}