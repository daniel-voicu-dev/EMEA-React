import React, {Component} from 'react';
import {connect} from 'react-redux';

import store from "../store";
import { fetchTree , markNodeOpen, openDetail } from "../actions/treeActions";


export default class Tree extends Component {     
  componentWillMount() {
    if(!Object.keys(this.props.data).length) {
      store.dispatch(fetchTree());
    }
    
  }   
  render() {     
    let { data } = this.props;  
    let children = [];
    if(data.children != undefined) children = data.children;   
    return (      
      <ul>
          {children.map((o,i) => <TreeElement  key={i} data={o} />)}
      </ul>
    );
  }    
   
}

class TreeElement extends Component {    
  handleChildrenContainer(id) {    
    store.dispatch(markNodeOpen(id));
  }
  loadGroup(id) {
    store.dispatch(openDetail(id));
  }
  render() {   
    let {open, children, id, title, active } = this.props.data;
    let childrenContainerVisibility = open ? "show" : "hidden";
    let iconClass = open ? "fa fa-minus" : "fa fa-plus";
    let iconVisibility = children.length > 0 ? "icon" : "hidden";
    let buttonClass = active ? "link active" : "link"   
    if(children.length > 0 ) {     
      return (
        <li>
          <button onClick={() => this.handleChildrenContainer(id)} className={iconVisibility}><i className={iconClass}></i></button>  <button onClick={() => this.loadGroup(id)} className={buttonClass}>{title}</button>
          <ul className={childrenContainerVisibility}>
            {children.map((o,i) => <TreeElement  key={i} data={o} />)}
          </ul>
        </li>
      );
    } else {
      return (
        <li>
          <button onClick={() => this.handleChildrenContainer(id)} className={iconVisibility}><i className={iconClass}></i></button>  <button onClick={() => this.loadGroup(id)} className={buttonClass}>{title}</button>
        </li>
      );
    }
  }
}
