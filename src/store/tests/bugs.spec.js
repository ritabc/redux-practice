import { addBug } from "../bugs";
import configureStore from "../configureStore";

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

// Social Test
describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    // dispatch(addBug) => check the store
    const store = configureStore();
    const bug = { description: "a" };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
