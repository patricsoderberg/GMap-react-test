import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'google-maps/lib/Google.min';
import 'google-maps-api'
import './App.css';

import GMaps from 'gmaps/gmaps';
import Map from './component/map/Map';
import CurrentLocation from './component/currentLocation/CurrentLocation';
import LocationList from './component/locationList/LocationList';
import Search from './component/search/Search';


class App extends Component {

  constructor (props) {
    super(props);

    let favorites = [];
    if(localStorage.favorites) {
        favorites = JSON.parse(localStorage.favorites)
    }
    this.state =  {
      favorites: favorites,
      currentAddress: 'Paris, France',
      mapCoordinates: {
        lat: 48.856614,
        lng: 2.3522219
      }
    }

  }

  Limpa() {
    return {
      limp: true,
      age: 24,
      name: 'Linus'
    }
  }

  toggleFavorite(address) {

    if (this.isAddressInFavorites(address)) {
        this.removeFromFavorites(address);
    }
    else {
      this.addToFavorites(address);
    }
  }

  addToFavorites(address) {
    let favorites = this.state.favorites;
    favorites.push ({
      address: address,
      timestamp: Date.now()
    })

    this.setState({
      favorites: favorites
    });
    localStorage.favorites = JSON.stringify(favorites);

  }

  removeFromFavorites(address) {

    // let favorites = this.state.favorites;
    let favorites = this.state.favorites.filter((favorite)=> {
      return favorite.address !== address;
    })

    this.setState({
      favorites: favorites
    })
    localStorage.favorites = JSON.stringify(favorites);
  }

  isAddressInFavorites(address) {
    let favorites = this.state.favorites;
    let favoritExists = false;

    favorites.forEach((favorite)=> favoritExists = (favorite.address === address))
    return favoritExists;
  }

  searchForAddress(address) {

    GMaps.geocode({
      address:address,
      callback: (results,status)=>{
        if (status !=='OK') return

        let latlng = results[0].geometry.location;
        this.setState({
          currentAddress: results[0].formatted_address,
          mapCoordinates : {
            lat: latlng.lat(),
            lng: latlng.lng()
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Your Google Maps Locations</h1>
        <Search onSearch={(address) => this.searchForAddress(address)} />

        <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />
        <CurrentLocation address={this.state.currentAddress}
          favorite={this.isAddressInFavorites(this.state.currentAddress)}
          onFavoriteToggle={(address) => this.toggleFavorite(address)} />

        <LocationList locations={this.state.favorites}
          activeLocationAddress={this.state.currentAddress}
          onClick={(address) => this.searchForAddress(address)} />
      </div>
    );
  }
}

export default App;
