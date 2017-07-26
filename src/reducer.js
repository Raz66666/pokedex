import {all_pokemons} from './actions/PokemonsShowActions.js';

function setState(newState) {
    return newState;
}

export default function (state = {}, action) {
    switch (action.type) {
        case 'INIT_POKEMONS':
            console.log(all_pokemons(action.state));
            return all_pokemons(action.state);
        case 'ALL_POKEMONS':
            console.log(action.type);
            return next_pokemons(state);
    }
        
    return state;
}