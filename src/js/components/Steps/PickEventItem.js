import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { setEvent } from '../../actions/eventActions';
import Header from "../Header";

const PickEventItem = props => {
  console.log(props);
  let [items, setItems] = useState(props.EventItems);

  const handleClick = (v) => {
    let item = items.filter(o => o.ItemNo ===v).length > 0 ? items.filter(o => o.ItemNo ===v)[0] : null;
    if (item !== null) {
      props.setEvent(props.history, item);
    } else {
      console.log("ERROR: No item with value" + v);
    }    
  }
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <article className="col-12">
            <div className="row">
              <div className="col-4 d-none">
                <img className="img-fluid" src="/images/registration-asia-2019.png" alt="" />
              </div>
              <div className="col-8 col-12 d-flex align-items-center flex-wrap">                  
                <div>
                  <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                  <p className="">In order to continue please select an event item.</p> 
                  {items.map((o,i)=> {return(<button type="button" ke={i} onClick={() => handleClick(o.ItemNo)} className="btn btn-primary px-5">{o.ItemDescription}</button>)})}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>  
    </React.Fragment>
  )
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    EventItems: state.event.EventItems
  }
}

const mapDispatchToProps = {setEvent}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickEventItem)

