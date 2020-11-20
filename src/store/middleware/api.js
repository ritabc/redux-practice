import axios from "axios";
import * as actions from "../api";
// Example action
// const action = {
//     type: 'apiCallBegan', // OR apiRequest, etc,
//     payload: { // All data the API call needs
//         url: '/bugs',
//         method: 'get',
//         data: {},
//         onSuccess: 'bugsReceived', // the name of the action that should be dispatched upon success
//         onError: 'apiRequestFailed', // Or 'bugRequestFailed'
//     }
// }

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  next(action);
  const { url, method, data, onSuccess, onError } = action.payload;
  try {
    // Make api call
    const response = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    // Handle success
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific handling
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // Handle error
    // General handling
    dispatch(actions.apiCallFailed(error));
    // Specific handling (if onError is defined)
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
