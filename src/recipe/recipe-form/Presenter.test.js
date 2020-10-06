import { buildProdDetailsFromSelectedProds } from "./Presenter";

describe("Recipe Form Presenter", () => {
  describe("New Recipe", () => {
    it("build prod details basic", () => {
      const currentRecipe = {};
      const selectedProducts = ["prod1", "prod2"];
      const productMap = {
        byId: {
          prod1: { id: "prod1" },
          prod2: { id: "prod2" },
        },
      };
      const quantityMap = {
        prod1: 3,
        prod2: 2,
      };
      const result = buildProdDetailsFromSelectedProds({
        currentRecipe,
        selectedProducts,
        productMap,
        quantityMap,
      });

      const detail1 = result.filter((detail) => detail.id === "prod1").pop();
      const detail2 = result.filter((detail) => detail.id === "prod2").pop();

      expect(detail1.quantity).toBe(3);
      // new prodDetails
      expect(detail1.detailId).toBe(undefined);
      expect(detail1.id).toBe("prod1");

      expect(detail2.quantity).toBe(2);
      expect(detail2.detailId).toBe(undefined);
      expect(detail2.id).toBe("prod2");
    });
    it("should be a new Recipe if there is no selectedProduct and prodDetail return [] ", () => {
      const currentRecipe = {};
      const selectedProducts = [];
      const quantityMap = {
        prod1: 3,
      };
      const productMap = {
        byId: {
          prod1: { id: "prod1" },
          prod2: { id: "prod2" },
        },
      };
      const result = buildProdDetailsFromSelectedProds({
        currentRecipe,
        selectedProducts,
        productMap,
        quantityMap,
      });

      expect(result).toEqual([]);
    });
    it("should return [] if prodsDetails is [] and selectedProducts is []", () => {
      const currentRecipe = { prodsDetails: [] };
      const selectedProducts = [];
      const quantityMap = {};
      const productMap = {
        byId: {
          prod1: { id: "prod1" },
          prod2: { id: "prod2" },
        },
      };
      const result = buildProdDetailsFromSelectedProds({
        currentRecipe,
        selectedProducts,
        productMap,
        quantityMap,
      });

      expect(selectedProducts).toEqual([]);
      expect(result).toEqual([]);
      expect(currentRecipe.prodsDetails).toEqual([]);
    });
    it("should quantityMap be the source of truth, quantityDefault has to be the equal to prodDetail.quantity", () => {
      const currentRecipe = {};
      const selectedProducts = ["prod1", "prod2"];
      const productMap = {
        byId: {
          prod1: { id: "prod1", quantityDefault: 3 },
          prod2: { id: "prod2", quantityDefault: 2 },
        },
      };
      // quantityMap was loaded from quantityDefault as prodDetail only exist for created recipes
      const quantityMap = {
        prod1: 3,
        prod2: 2,
      };
      const result = buildProdDetailsFromSelectedProds({
        currentRecipe,
        selectedProducts,
        productMap,
        quantityMap,
      });

      const detail1 = result.filter((detail) => detail.id === "prod1").pop();
      const detail2 = result.filter((detail) => detail.id === "prod2").pop();

      expect(detail1.quantity).toBe(productMap.byId["prod1"].quantityDefault);
      expect(detail2.quantity).toBe(productMap.byId["prod2"].quantityDefault);
    });
  });

  describe("Edit Recipe", () => {
    it("should build properly", () => {
      const currentRecipe = {
        prodsDetail: [
          {
            id: "prod1",
            quantity: 3,
            detailId: "detail_01",
          },
        ],
        id: "rec1",
      };
      const selectedProducts = ["prod1"];
      const productMap = {
        byId: {
          prod1: { id: "prod1" },
          prod2: { id: "prod2" },
        },
      };
      const quantityMap = {
        prod1: 3,
      };
      const result = buildProdDetailsFromSelectedProds({
        currentRecipe,
        selectedProducts,
        productMap,
        quantityMap,
      });
      expect(result.length).toBe(1);
      const detail1 = result.filter((detail) => detail.id === "prod1").pop();
      expect(detail1.detailId).toBe("detail_01");
      expect(detail1.quantity).toBe(3);
      expect(detail1.id).toBe("prod1");
    });
    it("should quantityMap be the source of truth, EDIT load from ProdDetail -- quantityMap has to be the equal to prodDetail.quantity", () => {
      const currentRecipe = {
        prodsDetail: [
          {
            id: "prod1",
            quantity: 5,
            detailId: "detail_01",
          },
        ],
        id: "rec1",
      };
      const selectedProducts = ["prod1"];
      const productMap = {
        byId: {
          prod1: { id: "prod1", quantityDefault: 1 },
          prod2: { id: "prod2", quantityDefault: 1 },
        },
      };
      const quantityMap = {
        prod1: 5,
      };
      const result = buildProdDetailsFromSelectedProds({
        currentRecipe,
        selectedProducts,
        productMap,
        quantityMap,
      });
      const detail1 = result.filter((detail) => detail.id === "prod1").pop();
      const detail2 = result.filter((detail) => detail.id === "prod2").pop();

      expect(detail1.quantity).not.toBe(
        productMap.byId["prod1"].quantityDefault
      );
      expect(detail1.quantity).toBe(quantityMap["prod1"]);

      expect(detail2).toEqual(undefined);
    });
  });
});
