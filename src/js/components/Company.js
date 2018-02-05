import React, { Component } from 'react'
import {connect} from 'react-redux'
import Select from "./Select"

@connect ((store) => {
  return { 
    companyList: store.user.CompanyList,
    companySelected: store.user.CompanyNo    
  }
})
class Company extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div className="form-group">
        { this.props.companyList.length === 0 &&
        <p className="alert alert-primary">There is no company assosciated with this email. You need to <a href="#" data-toggle="modal" data-target="#AddCompanyModal"><u><strong>create a Company</strong></u></a> to continue.</p> 
        }
        <label htmlFor="Company">Company</label>
        <Select id="Company" firstOption="Select a company" required="true" getValue={(v) => this.getCompany(v)} options={this.props.companyList} setValue={this.props.companySelected} />
        <button type="button" className="btn btn-dark mt-2" data-toggle="modal" data-target="#AddCompanyModal">Add a company</button> 
        <div id="AddCompanyModal" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Company</h5>
                  <button type="button" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                      <div className="form-group">
                          <label htmlFor="CompanyAdd">Company</label>
                          <input type="text" id="CompanyAdd" className="form-control" /> 
                      </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" type="button" className="btn btn-primary">Save changes</button>
                  <button type="button" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    </div>
    );
  }
}

export default Company;