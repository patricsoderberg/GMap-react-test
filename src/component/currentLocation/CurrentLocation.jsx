import React, {Component} from 'react';

class CurrentLocation extends Component {
  constructor() {
    super();
    this.state = {};
  }
  toggleFavorite () {
    this.props.onFavoriteToggle(this.props.address);
  }
  render () {
    let starClassName = "glyphicon glyphicon-star-empty";

    if (this.props.favorite) {
        starClassName = "glyphicon glyphicon-star";
    }

    return <div className="col-xs-12 col-md-6 col-md-offset-3 current-location">
      <h4 id="save-location"> {this.props.address}</h4> 
      <span className={starClassName} onClick={() => this.toggleFavorite()} aria-hidden="true"></span>
    </div>
  }
}

export default CurrentLocation;