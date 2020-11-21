import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnresolvedBugs } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();

  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          <button onClick={() => dispatch(resolveBug(bug.id))}></button>
          {bug.description}
        </li>
      ))}
    </ul>
  );
};

export default BugsList;
