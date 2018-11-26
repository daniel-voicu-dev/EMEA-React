import React, { Component } from 'react';


export default class CompanySelect extends Component {
  handleChange(e) {    
    this.props.getValue(e.currentTarget.value);   
  }
  render() {   
    let readonly = this.props.readOnly !== undefined && this.props.readOnly === "true" ? true : false;   
    return (
      <select className="form-control" id={this.props.id} required={this.props.required} disabled={readonly} onChange={(e)=> this.handleChange(e)} value={this.props.setValue}>
        <option value="">{this.props.firstOption}</option>
        {this.props.options.map((o,i)=>{ return( <option key={i} value={o.No}>{o.Name} ({o.City}, {o.CountryCode})</option>) })}
        <option value="newCompany">Add new Company</option>
      </select>
    );
  }
}
