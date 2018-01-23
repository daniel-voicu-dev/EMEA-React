import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

class VariantsContainer extends Component {   
    constructor(props) {
      super(props);
      this.state = {
        variantId: [],
        selectedVariantId: ""
      };
    }
    componentWillMount() {   
      
      this.setState({
        variantId: new Array(3).fill(null)
      });

    }  

    updateVariant(value , index) {
      console.log(value , index);
    }

    render() { 
        return (
          <React.Fragment>
            {this.props.data.map((o , i) => 
            
              <div key={i} className="variantWrapper col-md-6">  
                <label>{o.label}</label> 
                <Variant updateVariant={(value, index) => this.updateVariant()} data={o} /> 
              </div>
            )}
          </React.Fragment>
        );
      }     
     
}

class Variant extends Component {

    updateVariant(value , index) {
      console.log(value , index);
    };

    changed(event) {
      console.log(event.target.value);
      // this.props.triggerParentUpdate(event);
    }

    render() {
        return (
          <React.Fragment>        
            <select className="form-control" onChange={this.changed.bind(this)}>
              {this.props.data.values.map((o , i) => <option onClick={() => this.updateVariant(o.value , i)} value={o.value} key={i}>{o.label}</option>)}
            </select>
          </React.Fragment>
        )
    }
}
