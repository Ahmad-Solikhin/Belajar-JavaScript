import {callMe, MyException} from "../src/MyException.js";

test("exception", () => {
    expect(() => callMe("Gayuh")).toThrow();
    expect(() => callMe("Gayuh")).toThrow(MyException);
    expect(() => callMe("Gayuh")).toThrow("Error ges");
});

test("No exception", () => {
    expect(() => callMe("Ahmad")).not.toThrow();
});