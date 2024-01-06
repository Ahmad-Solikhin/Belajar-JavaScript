import {sum} from "../src/sum.js";

beforeAll(() => {
    console.info("Example create database connection");
});

beforeEach(() => {
    console.info("Before running");
});

afterEach(() => {
    console.info("After running");
});

test("First test", () => {
    expect(sum(10, 10)).toBe(20);
});

test("Second test", () => {
    expect(sum(10, 10)).toBe(20);
});

afterAll(() => {
    console.info("Example close database connection");
});