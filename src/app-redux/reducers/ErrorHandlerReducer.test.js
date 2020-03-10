import reducer from "./ErrorHandlerReducer";
import { HTTP_ERROR } from "../actions/ErrorHandlerAction";

describe("Visibility filter", () => {
  it("should not throw an error", () => {
    expect(() => {
      reducer(undefined, {});
    }).not.toThrow();
  });
  it("should return 404 message", () => {
    const action = {
      type: HTTP_ERROR,
      response: {
        status: 404
      }
    };
    expect(reducer({}, action)).toEqual({
      message: "Not Found"
    });
  });

  it("should return 500 message with no body", () => {
    const action = {
      type: HTTP_ERROR,
      response: {
        status: 500
      }
    };
    expect(reducer({}, action)).toEqual({
      message: "no body"
    });
  });

  it("should return 500 message with no body", () => {
    const action = {
      type: HTTP_ERROR,
      response: {
        status: 500,
        data: {
          message: "Some message"
        }
      }
    };
    expect(reducer({}, action)).toEqual({
      message: "Some message"
    });
  });
});
