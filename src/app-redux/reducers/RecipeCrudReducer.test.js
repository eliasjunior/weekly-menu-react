import Reducer from "./RecipeCrudReducer";
import RequiredParameterError from "common/RequiredParameterError";
import {
  RECIPE_CREATE,
  FETCH_RECIPES,
  RECIPE_UPDATE,
} from "app-redux/actions/RecipeCrudActions";

describe("RecipeCrudReducer.test", () => {
  describe("Create Recipe", () => {
    it("should create recipe first time", () => {
      const action = {
        payload: {
          id: "rec_01",
          name: "cake",
          prodsDetail: [
            {
              id: "prod1",
              quantity: 2,
              detailId: "detail1",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {};
      const result = Reducer(state, action);

      // const expected = test1.expected;
      // const result = reducer(test1.state, action);
      expect(result.byId["rec_01"]).toBeDefined();
      expect(result.allIds).toBeDefined();
    });
    it("should create recipe second time", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "second",
          prodsDetail: [
            {
              id: "prod1",
              quantity: 2,
              detailId: "detail1",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {
        byId: {
          id: "rec_01",
          name: "my rec",
        },
        allIds: ["rec_01"],
      };
      const result = Reducer(state, action);

      expect(result.byId["rec_02"].id).toBe("rec_02");
      expect(result.allIds.length).toBe(2);
    });
    it("should create recipe with prod details", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "second",
          prodsDetail: [
            {
              id: "prod1",
              quantity: 2,
              detailId: "detail1",
            },
            {
              id: "prod2",
              quantity: 100,
              detailId: "detail2",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {
        byId: {
          id: "rec_01",
          name: "my rec",
        },
        allIds: ["rec_01"],
      };
      const result = Reducer(state, action);

      const recipe = result.byId["rec_02"];

      expect(recipe.prodsDetail.length).toBe(2);
    });
    it("should prodDetails has all attributes", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "second",
          prodsDetail: [
            {
              id: "prod1",
              quantity: 2,
              detailId: "detail1",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {};
      const result = Reducer(state, action);

      const recipe = result.byId["rec_02"];

      const { prodsDetail } = recipe;

      expect(prodsDetail[0].id).toBe("prod1");
      expect(prodsDetail[0].quantity).toBe(2);
      expect(prodsDetail[0].detailId).toBe("detail1");
    });
    it("should throw an error if prod detail quantity is missing", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "second",
          prodsDetail: [
            {
              id: "prod1",
              detailId: "detail1",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {};

      const wrapFunction = () => {
        Reducer(state, action);
      };

      expect(wrapFunction).toThrow(RequiredParameterError);
      expect(wrapFunction).toThrowError(/quantity, from/);
    });
    it("should throw an error if prod detail prod id is missing", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "second",
          prodsDetail: [
            {
              detailId: "detail1",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {};

      const wrapFunction = () => {
        Reducer(state, action);
      };

      expect(wrapFunction).toThrow(RequiredParameterError);
      expect(wrapFunction).toThrowError(/Prod id, from/);
    });
    it("should throw an error prod detail quantity is missing", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "lemon cake",
          prodsDetail: [
            {
              id: "1",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {};

      const wrapFunction = () => {
        Reducer(state, action);
      };

      expect(wrapFunction).toThrow(RequiredParameterError);
      expect(wrapFunction).toThrowError(/quantity, from/);
    });
    it("should throw an error if quantity is a string", () => {
      const action = {
        payload: {
          id: "rec_02",
          name: "second",
          prodsDetail: [
            {
              id: "1",
              detailId: "1",
              quantity: "2",
            },
          ],
        },
        type: RECIPE_CREATE,
      };
      const state = {};

      const wrapFunction = () => {
        Reducer(state, action);
      };

      expect(wrapFunction).toThrow(RequiredParameterError);
      expect(wrapFunction).toThrowError(/is not a valid number/);
    });
  });
  describe("Update Recipe", () => {
    it("should replace the entire prodDetail list", () => {
      const action = {
        payload: {
          id: "rec_03",
          name: "Bolo",
          prodsDetail: [
            {
              id: "prod1",
              quantity: 2,
              detailId: "detail1",
            },
            {
              id: "prod2",
              quantity: 10,
              detailId: "detail2",
            },
          ],
        },
        type: RECIPE_UPDATE,
      };
      const state = {
        byId: {
          rec_03: {
            id: "rec_03",
            name: "Bolo",
            prodsDetail: [
              {
                id: "prod1",
                quantity: 2,
                detailId: "detail1",
              },
            ],
          },
        },
        allIds: ["rec_01"],
      };
      const result = Reducer(state, action);

      expect(result.byId["rec_03"]).toBeDefined();
      expect(result.allIds.length).toBe(1);

      expect(result.byId["rec_03"].prodsDetail.length).toBe(2);
    });
  });
});
