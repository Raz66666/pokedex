let pokeApi = 'http://pokeapi.co/api/v2';

export function all_pokemons(state) {
    $.ajax({
        url: pokeApi+'/pokemon?limit='+state.perPage,
        dataType: 'json',
        cache: false,
        success: function(data){
            state.species = data.results;
            state.next = data.next;
            state.prev = data.previous;
            state.allData = data;
            state.prev = [];
            state.pageOfItems = 10;
            state.ability = [];
        },
        error: function(xhr, status, err){
            state.species = [];
        }
    });
    return {
        type: 'INIT_POKEMONS',
        state
    }
}