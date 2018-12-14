import React, { Component } from 'react'

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      domain: this.props.domain !== undefined ? this.props.domain : "",
      valid: null,
      inputValue: "",
      value: this.props.setValue !== undefined && this.props.setValue !== "" ? this.props.setValue : ""
    };
  }
  componentWillMount() {
    if(this.state.domain !== "") {
      let inputValue = this.state.value.split("@")[0];
      this.setState({inputValue});
    } else {
      let inputValue = this.state.value;
      this.setState({inputValue});
    }
  }
  isValidEmail(value){
    if (value !== "") {
      return value.indexOf("@") > 0 && value.indexOf(".") > 2 && value.length > 5 && value.indexOf(".") < value.length - 1 && value.indexOf("@") < value.lastIndexOf(".") - 1;
    }
    return true;
  }
  handleChange(e) { 
    let inputValue = e.currentTarget.value;  
    let value = e.currentTarget.value;
    this.setState({inputValue});
    this.setState({value});    
  } 
  handleChangeWithDomain(e) {    
    let inputValue = e.currentTarget.value;  
    let value = e.currentTarget.value + this.state.domain;    
    this.setState({inputValue});  
    this.setState({value});  
  } 
  handleBlur(e) {
    if (!this.isValidEmail(e.currentTarget.value)) {
      this.setState({valid:false});
      this.props.getEmail("");
    } else {
      this.setState({valid: true});
      this.props.getEmail(this.state.value);
    }
  }
  handleBlurWithDomain(e) {
    if (e.currentTarget.value === "") {
      this.setState({valid:false});
      this.props.getEmail("");
    } else {
      this.setState({valid: true});
      this.props.getEmail(this.state.value);
    }
  }
  render() {
    let inputClass = this.state.valid === false ? "is-invalid form-control" : "form-control";
    if (this.state.domain !== "") {
      return (
        <div className="form-group">    
        <div className="input-group">
          <input type="text" className={inputClass} placeholder="Email address..." onChange={(e) => this.handleChangeWithDomain(e)} value={this.state.inputValue} required={this.props.required} disabled={this.props.readonly} onBlur={(e) => this.handleBlurWithDomain(e)} />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">{this.state.domain}</span>
          </div>
          <small className="invalid-feedback">
            Invalid email
          </small>
        </div>          
                  
        </div>
      )  
    }
    return (
      <div className="form-group">   
        <input type="text" className={inputClass} placeholder="Email address..." onChange={(e) => this.handleChange(e)} value={this.state.inputValue} required={this.props.required} disabled={this.props.readonly} onBlur={(e) => this.handleBlur(e)} />
        <small className="invalid-feedback">
          Invalid email
        </small>
      </div>
    )
  }
}
