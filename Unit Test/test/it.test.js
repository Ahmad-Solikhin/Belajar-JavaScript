import {sum} from "../src/sum.js";

describe("When call sum(10, 10)", () => {
    it("Should get 20", () => {
        expect(sum(10, 10)).toBe(20);
    });
});