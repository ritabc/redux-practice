import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  static contextType = StoreContext;
  state = { bugs: [] };
  componentDidMount() {
    const store = this.context;

    // subscribe so we get notified when the state of the store changes
    this.unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;
      if (this.state.bugs !== bugsInStore) this.setState({ bugs: bugsInStore });
    });

    // dispatch(loadBugs) to get list of bugs from backend
    store.dispatch(loadBugs());
    console.log(this.context);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <ul>
        {this.state.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

Bugs.contextType = StoreContext;

export default Bugs;
