import axios from "axios";
import { addBug } from "../bugs";
import configureStore from "../configureStore";
import MockAdapter from "axios-mock-adapter";

// // Solitary test
// describe("bugsSlice", () => {
//   describe("Action creators", () => {
//     it("addBug", () => {
//       const bug = { description: "a" };
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: "/bugs",
//           method: "post",
//           data: bug,
//           onSuccess: bugAdded.type,
//         },
//       };
//       expect(result).toEqual(expected);
//     });
//   });
// });

// Social Test - will fail if backend server is not running (so, technically, an integration test)
describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    // dispatch(addBug) => check the store
    const store = configureStore();
    const bug = { description: "a" };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});

describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost("/bugs").reply(200, savedBug);
    const store = configureStore();
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});
