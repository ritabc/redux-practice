import React, { Component } from "react";
import { getUnresolvedBugs, loadBugs, resolveBug } from "../store/bugs";
import { connect } from "react-redux";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>
            {bug.description}
            <button onClick={() => this.props.resolveBug(bug.id)}>
              Resolve
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  //   bugs: state.entities.bugs.list,
  bugs: getUnresolvedBugs(state),
});

const mapDispatchToProps = (dispatch) => ({
  // Properties of this object are the props of the component
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

// First argument: which part of the store is this component interested in?
/// In this case, bugs. This argument should be a function that returns an object
// Second argument is another function and is for dispatching actions. Takes dispatch func of store, maps to props of component.
// Calling the func that connect returns creates another function that
// Call connect() -> returns another function -> Calling this with Bugs component -> creates a new component under the hood that wraps the Bug component -> This comp takes care of subscribing & unsuscbribing from teh store
// Bugs component is a dummy or presentationi component: it only presents data
// The wrapper component is a container component
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
