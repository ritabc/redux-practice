import axios from "axios";

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
  if (action.type !== "apiCallBegan") return next(action);
  next(action);
  const { url, method, data, onSuccess, onError } = action.payload;
  try {
    // Make api call
    const response = await axios.request({
      baseURL: "http://localhost:9002/api",
      url,
      method,
      data,
    });
    // Handle success
    dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // Handle error
    dispatch({ type: onError, payload: error });
  }
};

export default api;
