import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";

class Bugs extends Component {
  static contextType = StoreContext;

  componentDidMount() {
    // subscribe so we get notified when the state of the store changes
    // dispatch(loadBugs) to get list of bugs from backend
    console.log(this.context);
  }
  render() {
    return <div>Bugs</div>;
  }
}

Bugs.contextType = StoreContext;

export default Bugs;
