import React, { Component } from 'react';


export default class Select extends Component {
  constructor(props) {
    super(props);    
  }  

  render() {
    let value = this.props.setValue !== undefined ? this.props.setValue : "";
    let readonly = this.props.readOnly !== undefined && this.props.readOnly === "true" ? true : false;
    return (
      <select className="form-control" id={this.props.id} required={this.props.required} readOnly={readonly} onChange={(e)=> this.props.getValue(e.currentTarget.value)} value={value}>
        <option value="">{this.props.firstOption}</option>
        {this.props.options.map((o,i)=>{ return( <option key={i} value={o.CompanyNo}>{o.CompanyName}</option>) })}
      </select>
    );
  }
}
