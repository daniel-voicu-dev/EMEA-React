import React, {Component} from 'react';

import Tree from "./Tree";
import Main from "./Main";

import store from "../store";
import {connect} from 'react-redux';

import "../../sass/main.sass";

@connect ((store) => {
  return {
    data: store
  }
})


export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="tree"><Tree data={this.props.data.tree.tree} /></div>
        <div id="main"><Main data={this.props.data.tree.main}/></div>        
      </React.Fragment>
    );
  }
}