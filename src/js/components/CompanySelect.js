import React, { Component } from 'react';


export default class CompanySelect extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      selected: props.setValue
    }   
  }   
  
  handleChange(e) {
    this.setState({selected: e.currentTarget.value});
    this.props.getValue(e.currentTarget.value);   
  }
  render() {
    let value = this.state.selected;
    let readonly = this.props.readOnly !== undefined && this.props.readOnly === "true" ? true : false;
   
    return (
      <select className="form-control" id={this.props.id} required={this.props.required} readOnly={readonly} onChange={(e)=> this.handleChange(e)} value={value}>
        <option value="">{this.props.firstOption}</option>
        {this.props.options.map((o,i)=>{ return( <option key={i} value={o.CompanyNo}>{o.CompanyName}</option>) })}
      </select>
    );
  }
}
