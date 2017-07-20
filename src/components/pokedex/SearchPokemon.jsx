import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SearchPokemon extends Component {
    constructor(props){
        super(props);
        this.onChangePokemon = this.onChangePokemon.bind(this);

    }
    
    onChangePokemon(event){
        var _this = $(event.target);
        var _searchMap = $('.searchable')
        var _searchName = _this.val();
        _searchMap.removeClass('hide');
        if(_searchName == ''){
            _searchMap.removeClass('hide');
        }
        else{
            _searchMap.each(function(index){
                if($(this).find('h4').text().indexOf(_searchName) == -1){
                    $(this).addClass('hide');
                }
                else{
                    $(this).removeClass('hide');
                }
            });
        }
    }
    
    render() {
        return (
            <div className="col-lg-6">
                <label>Search Pokemon</label>
                <input onKeyUp={this.onChangePokemon} className="SearchPokemon"  />
            </div>
            );
    }

}

export default SearchPokemon;