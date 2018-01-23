import React, {Component} from 'react';

export default class ProductImage extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      "data": this.props.data
    };
  }
  componentWillMount() {  
    let imageArray = this.props.data.reduce((res,val,key)=>{
      let obj ={}
      if (key === 0) {
        obj.active = true;
      } else {
        obj.active = false;
      } 
      obj.src = val;    
      res = [...res, obj]
      return res;
    },[]);    
    // console.log(imageArray);
    this.setState({data: imageArray});
  }    

  activateImage(index) {
    let data = this.state.data.reduce((r,v,k) => {
      if (k === index) {
        v.active = true;
      } else {
        v.active = false;
      }
      r = [...r,v];
      return r;
    },[]);
    this.setState({data});
  }

  render() {    
    var activeImageSrc = this.state.data.filter(o => {return o.active == true})[0] === undefined ? "" : this.state.data.filter(o => {return o.active == true})[0].src;
    return (
      <React.Fragment>
      <div className="main-image">
        <img className="img-fluid mx-auto" src={activeImageSrc} data-big-image={activeImageSrc}  />
      </div>

      <div className="d-flex flex-wrap">
        <ul className="list-unstyled d-flex flex-wrap my-3">
          {this.state.data.map((o,i) => {
            return (
              <li key={i}>
                  <img src={o.src} className="img-fluid thumb-img" onClick={() => this.activateImage(i)} />
              </li>
            );
          })}
        </ul>
      </div>

      </React.Fragment>
    );
  }    
   
}





