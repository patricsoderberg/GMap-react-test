import React, {Component} from 'react'; 
import moment from 'moment';

class LocationItem extends Component {

  handleClick () {    
    this.props.onClick(this.props.address);
  }

  render (){
    let cn =this.props.active ? "active-location" : "list-group-item";

    return (
      <a className={cn} onClick={() => this.handleClick()} >
        {this.props.address}
        <span className="createdAt"> {moment(this.props.timestamp).fromNow} </span>
        <i className="glyphicon glyphicon-menu-right"></i>
      </a>
    )
  }
}

export default LocationItem;


