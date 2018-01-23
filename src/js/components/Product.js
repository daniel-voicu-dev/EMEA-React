import React, {Component} from 'react';

import ProductImage from "./ProductImage";

export default class Product extends Component {
 
  createMarkup(arg) {
    return {__html: arg};
  }
  
  render() {
    
    
    return (
      <div id="product" className="d-flex">
        <div className="image-container col-sm-6">
          <ProductImage data={this.props.data.images} />
        </div>
        <div className="product-container col-sm-6">
          <h2 className="h2">{this.props.data.title}</h2>
          <div dangerouslySetInnerHTML={this.createMarkup(this.props.data.summary)}></div>
          <p className="product-number">Item #: {this.props.data.productNumber}</p>
          <p className="price">{this.props.data.currency}{this.props.data.price}</p>
          <div className="options-container">
            
          </div>
        </div>
        
      </div>
    );
  }
}