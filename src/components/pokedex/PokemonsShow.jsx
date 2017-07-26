import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import Pagination from './Pagination.jsx';
import Pokemon from './Pokemon.jsx';
import SearchPokemon from './SearchPokemon.jsx';
import * as PokemonsShowActions from './../../actions/PokemonsShowActions.js'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class PokemonsShow extends Component {

    constructor(props){
        super(props);
        console.log(props.state);
        this.state = props.state;
        this.onChangePage = this.onChangePage.bind(this);

    }

    getNextPokemonData(){
        $.ajax({
            url: this.state.next,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({species: data.results,
                      next: data.next,
                      prev: data.previous});
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({species: null});
            }.bind(this)
        });

    }

    getPrevPokemonData(){
        $.ajax({
            url: this.state.prev,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({species: data.results,
                      next: data.next,
                      prev: data.previous});
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({species: null});
            }.bind(this)
        });

    }

    componentDidMount(){
        
    }

    getPokemonList(){
        const {species} = this.state;

        return species.map((pokemon, index) =>{
            return <PokemonList
                    pokemon={pokemon}
                    key={pokemon.name}
                    id={index+1}/>
        })
    }

    nextPrev(){
        let prevDisabled = false;
        let nextDisabled = false;

        if (this.state.prev == null) {
            prevDisabled = true;
        };

        if(this.state.next == null){
            nextDisabled = true;
        }

        return (
            <div className="col-lg-12">
                <div className="pull-left">
                    <SearchPokemon />
                </div>
                <div className="pull-right">
                  <div className="btn-group btn-group-sm" role="group" aria-label="...">
                    <button onClick={this.getPrevPokemonData.bind(this)} disabled={prevDisabled} type="button" className="btn btn-primary">prev</button>
                    <button onClick={this.getNextPokemonData.bind(this)} disabled={nextDisabled} type="button" className="btn btn-primary">next</button>
                  </div>
                </div>
            </div>
        )
    }
    
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    
    render() {
      if(typeof this.state.species == 'undefined'){
          this.state.species = [];
      }
      if(typeof this.state.pageOfItems == 'undefined'){
          this.state.pageOfItems = [];
      }
      
      const no = function(a){
        return a.substr(32).split('/').join('');
      };

        return (
            <Router>
            <div>
            <Route exact={true} path="/" render={() => (
              
              <div className="row">
                
                  {this.nextPrev()}
                  <br/><hr/>
                {
                this.state.pageOfItems.map((pokemon, index) => (
                  
                    <div  className="searchable" key={no(pokemon.url)}>
                        <div className="col-md-3 col-sm-4 col-xs-6">
                            <div className="panel panel-default">
                                <div className="panel-heading text-center"><h4>#{no(pokemon.url)}.{pokemon.name}</h4></div>
                                <div className="panel-body text-center">
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${no(pokemon.url)}.png`}/>
                                </div>
                                <div className="panel-footer">
                                    <div className="clearfix">
                                        <div className="btn-group btn-group-xs pull-right">
                                            <Link to={`pokemon/${no(pokemon.url)}`} className="btn btn-primary">detail</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
              <Pagination items={this.state.species} onChangePage={this.onChangePage} />
              </div>
            )}/> 
            <Route exact path="/pokemon/:id" component={PokemonView}/>  
            </div>
            </Router>
        )
    }
}

function mapStateToProps (state) {
    console.log(state);
    return {
        state: {
            ability: state.state.ability,
            allData: state.state.allData,
            species: state.state.species,
            pageOfItems: state.state.pageOfItems,
            next: state.state.next,
            prev: state.state.prev,
            perPage: state.state.perPage
        }
    }
}

function mapDispatchToProps(dispatch) {
  return {
    PokemonsShowActions: bindActionCreators(PokemonsShowActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PokemonsShow)

const PokemonView = ({ match }) => {
    return (
        <div>
            <Pokemon pokemonId={match.params.id}/>
        </div>
    )
};

PokemonsShow.propTypes = {
    pokeApi: React.PropTypes.string,
};

PokemonsShow.defaultProps = {
    pokeApi: 'http://pokeapi.co/api/v2',
};

