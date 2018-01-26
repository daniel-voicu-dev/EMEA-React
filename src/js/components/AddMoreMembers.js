import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header';

class AddMoreMembers extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <article className="col-12">
              <div className="row">
                <div className="col-4">
                  <img className="img-fluid" src="http://placehold.it/1600x1600" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">
                  <div>
                    <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                    <p>We have found the following list of users assigned to your company. Please select the users you want to add to registration or <Link to="/add-new-user">add new user</Link> for your company.</p>
                    <div action="">
                      <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                              User 1
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                              User 2
                            </label>
                          </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link to="/add-new-member" className="btn btn-dark mr-3">Add new user</Link>
                      <Link to="/register-others" className="btn btn-primary">Take me to registration</Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddMoreMembers;