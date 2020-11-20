import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "developers",
  initialState: [],
  reducers: {
    developerAdded: (developers, action) => {
      developers.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { developerAdded } = slice.actions;
export default slice.reducer;
