// /// Method without @reduxjs/toolkit

// const PROJECT_ADDED = "projectAdded";

// let lastID = 0;

// // Action creator
// export function projectAdded(name) {
//   return {
//     type: PROJECT_ADDED,
//     payload: {
//       name,
//     },
//   };
// }

// export default function reducer(state = [], action) {
//   if (action.type === PROJECT_ADDED) {
//     return [...state, { id: ++lastID, name: action.payload.name }];
//   }
//   return state;
// }

/// Method with @reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";

let lastID = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastID,
        description: action.payload.name,
      });
    },
  },
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
