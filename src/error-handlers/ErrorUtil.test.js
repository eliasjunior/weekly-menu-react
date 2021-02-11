import { ErrorMapper } from "./ErrorUtil";
import {MESSAGE_TYPE_ERROR} from "../app-redux/actions/AlertHandlerAction";

describe("ErrorUtil", () => {
    it("It should give me a clear error message when response is undefined", () => {
        const expectedMessage = {
            message: "Application view error", type: MESSAGE_TYPE_ERROR
        }
        expect(ErrorMapper(undefined)).toEqual(expectedMessage);
    });
    it("It should give me a clear error message when response is {}", () => {
        const expectedMessage = {
            message: "Application view error", type: MESSAGE_TYPE_ERROR
        }
        expect(ErrorMapper({})).toEqual(expectedMessage);
    });
    it("It should give me a clear error message when response is weird", () => {
        const expectedMessage = {
            message: "Application view error", type: MESSAGE_TYPE_ERROR
        }
        expect(ErrorMapper({code: 111})).toEqual(expectedMessage);
        expect(ErrorMapper({sha: ""})).toEqual(expectedMessage);
    });
    it("It should give me a clear error message when response half correct", () => {
        const expectedMessage = {
            message: "Some error occur but app could not read the message from the server", type: MESSAGE_TYPE_ERROR
        }
        expect(ErrorMapper({status: 500, statusText: ""})).toEqual(expectedMessage);

        const expectedMessage2 = {
            message: "Server Error server code=501", type: MESSAGE_TYPE_ERROR
        }
        expect(ErrorMapper({status: 501, statusText: ""})).toEqual(expectedMessage2);
    });
});