import React, {Component} from 'react';

class Search extends Component {

  constructor (props) {
    super(props); 
    this.state = { value: ''}
  }

  handleChange(event) {
    this.setState({value : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
      this.props.onSearch(this.state.value);

    this.inputElement.blur();
  }

  render() {
    return (
      <form id="geocoding_form" className="form-horizontal" onSubmit={(event) => {this.handleSubmit(event)} }>
				<div className="form-group">
					<div className="col-xs-12 col-md-6 col-md-offset-3">
						<div className="input-group">
							<input ref={node => this.inputElement = node} type="text" className="form-control" id="address" placeholder="Find a location..." 
							value={this.state.value} onChange={(event)=> {this.handleChange(event)} } />
							<span className="input-group-btn">
								<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
							</span>
						</div>
					</div>
				</div>
			</form>
    )
  }
}

export default Search;