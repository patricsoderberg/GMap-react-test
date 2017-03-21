import React,{Component} from 'react';
import LocationItem from './LocationItem';

class LocationList extends Component {
  render () {
    let locations = this.props.locations.map((one) => {
      let active = this.props.activeLocationAddress === one.address;
      return <LocationItem key={one.timestamp} address={one.address} timestamp={one.timestamp}
                active={active} onClick={(address) =>this.props.onClick(address)} />
    });

    if(locations.lenght === 0) {
      return null; 
    }

    return (
      <div className="list-group col-xs-12 col-md-6 col-md-offset-3"> 
        <span className="list-group-item active">
          Saved locations
        </span>
          {locations}
      </div>
    )
  }
}

export default LocationList;