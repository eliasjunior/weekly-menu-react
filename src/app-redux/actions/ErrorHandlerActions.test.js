import { HTTP_ERROR, httpError } from "./ErrorHandlerAction";

describe("actions http error", () => {
  it("should return correct action", () => {
    const expectedAction = {
      type: HTTP_ERROR,
      response: {
        status: 404
      }
    };

    expect(httpError({ response: { status: 404 } })).toEqual(expectedAction);
  });
});
