import React, { Component } from 'react';


export default class CountrySelect extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      selected: ""
    }  
  }  
  componentDidMount() {
    console.log(this.props);
    if (this.props.setValue !== undefined) {
      this.setState({selected: this.props.setValue});
    }
  }
  componentDidUpdate() {    
    if ((this.props.setValue !== undefined && this.props.setValue !== "") && this.state.selected === "") {
      this.setState({selected: this.props.setValue});
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
      <select className="form-control rounded-0" id={this.props.id} required={this.props.required} readOnly={readonly} onChange={(e)=> this.handleChange(e)} value={value}>
        <option value="">{this.props.firstOption}</option>
        {this.props.options.map((o,i)=>{ return( <option key={i} value={o.Code}>{o.Name}</option>) })}
      </select>
    );
  }
}
