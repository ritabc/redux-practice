import axios from "axios";
import { addBug, resolveBug, getUnresolvedBugs, loadBugs } from "../bugs";
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

// // Social Test - will fail if backend server is not running (so, technically, an integration test)
// describe("bugsSlice", () => {
//   it("should handle the addBug action", async () => {
//     // dispatch(addBug) => check the store
//     const store = configureStore();
//     const bug = { description: "a" };
//     await store.dispatch(addBug(bug));
//     expect(store.getState().entities.bugs.list).toHaveLength(1);
//   });
// });

// Social Test with mock http calls
describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  // Handle some of the arrange code up here, specifically the code that will be relevant for many tests
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  // Helpers
  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });
  describe("addBug", () => {
    it("should add the bug to the store if it's saved to the server", async () => {
      // AAA : Arrange (initialiazation) Act (code for triggering the action) Assert (assertion/expectation)
      // Arrange
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(200, savedBug);

      // Act
      await store.dispatch(addBug(bug));

      // Assert
      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if it's not saved to the server", async () => {
      const bug = { description: "a" };
      fakeAxios.onPost("/bugs").reply(500);

      await store.dispatch(addBug(bug));

      expect(bugsSlice().list).toHaveLength(0);
    });
  });

  describe("resolveBug", () => {
    it("should mark the bug as resolved in the store if it's saved to the server", async () => {
      const bugId = 1;

      fakeAxios.onPost("bugs").reply(200, { id: bugId });
      fakeAxios
        .onPatch("/bugs/" + bugId)
        .reply(200, { id: bugId, resolved: true });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(bugId));

      expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it("should not mark the bug as resolved in the store if it's not saved to the server", async () => {
      const bugId = 1;
      fakeAxios.onPost("/bugs").reply(200, { id: bugId });
      fakeAxios.onPatch("/bugs/" + bugId).reply(500);

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(bugId));
      expect(bugsSlice().list[0].resolved).toBeUndefined();
    });
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });

  describe("loadingBugs", () => {
    describe("if bugs exist in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        // dispatch loadBugs() action twice, then determine if two or one http requests were made
        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        // Get history of get requests
        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("if the bugs don't exist in the cache", () => {
      it("they should be fetched from the server and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });
      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            // By calling reply with a function, we can execute code before the server responds
            expect(bugSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });
        it("should be false after bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });
});
