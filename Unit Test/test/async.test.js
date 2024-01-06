import {sayHelloAsync} from "../src/async.js";

test("Async function", async () => {
    const result = await sayHelloAsync("Gayuh");
    expect(result).toBe("Hello Gayuh");
});

test("Test async matchers", async () => {
   await expect(sayHelloAsync("Gayuh")).resolves.toBe("Hello Gayuh");
   await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});