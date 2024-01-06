beforeAll(() => console.info("Before all outer"));
afterAll(() => console.info("After all outer"));
beforeEach(() => console.info("Before each outer"));
afterEach(() => console.info("After each outer"));

test("Test outer", () => console.info("Test outer"));

describe('Inner', () => {
    beforeEach(() => console.info("Before each inner"));
    afterEach(() => console.info("After each inner"));

    test("Inner test", () => {
        console.info("Inner test")
    })
});
