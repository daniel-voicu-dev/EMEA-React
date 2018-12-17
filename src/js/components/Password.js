import React, { Component } from 'react'

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      valid: null,      
      value: this.props.setValue !== undefined && this.props.setValue !== "" ? this.props.setValue : ""
    };
  }   
  handleChange(e) {   
    let value = e.currentTarget.value;
    this.setState({value});    
  } 
  handleBlur(e) {
    if (e.currentTarget.value === "") {
      this.setState({valid:false});
      this.props.getPassword("");
    } else {
      this.setState({valid: true});
      this.props.getPassword(this.state.value);
    }
  }
  render() {
    let inputClass = this.state.valid === false ? "is-invalid form-control rounded-0" : "form-control rounded-0";    
    return (
      <div className="form-group">   
        <input type="password" className={inputClass} onChange={(e) => this.handleChange(e)} value={this.state.value} required={this.props.required} readOnly={this.props.readonly} onBlur={(e) => this.handleBlur(e)} />
        <small className="invalid-feedback">
          Field is required
        </small>
      </div>
    )
  }
}
