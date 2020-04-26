import { mergeProducts } from "./ShoppingHelper";

// describe("ShoppingHelper", () => {
//   it("merge products recipes and prods selected", () => {
//     //name, id, quantity: details.quantity
//     const prodsRecipe = [
//       {
//         name: "Pasta",
//         id: "prod_1",
//         recipes: [
//           { name: "Recieta Italiana", id: "rec_1", quantity: 2 },
//           { name: "Chinese Pasta", id: "rec_3", quantity: 1 },
//         ],
//       },
//       {
//         name: "Sugar",
//         id: "prod_2",
//         recipes: [
//           { name: "Cake", id: "rec_22", quantity: 100 },
//           { name: "Icecream", id: "rec_10", quantity: 200 },
//         ],
//       },
//     ];

//     const prodsSelected = [
//       {
//         name: "Pasta",
//         id: "prod_1",
//         quantity: 1,
//       },
//       {
//         name: "Beer",
//         id: "prod_9",
//         quantity: 10,
//       },
//     ];

//     const expected = [
//       {
//         name: "Beer",
//         id: "prod_9",
//         quantity: 10,
//       },
//       {
//         name: "Pasta",
//         id: "prod_1",
//         quantity: 1,
//         recipes: [
//           { name: "Recieta Italiana", id: "rec_1", quantity: 2 },
//           { name: "Chinese Pasta", id: "rec_3", quantity: 1 },
//         ],
//       },
//       {
//         name: "Sugar",
//         id: "prod_2",
//         recipes: [
//           { name: "Cake", id: "rec_22", quantity: 100 },
//           { name: "Icecream", id: "rec_10", quantity: 200 },
//         ],
//       },
//     ];
//     const received = mergeProducts({ prodsRecipe, prodsSelected });
//     console.log(">>>", received);
//     expect(received).toEqual(expected);
//   });
// });
