import {sayHelloAsync} from "../src/async.js";

it.concurrent("Concurrent 1",async  () => {
    await expect(sayHelloAsync("Ahmad")).resolves.toBe("Hello Ahmad");
});

it.concurrent("Concurrent 2",async  () => {
    await expect(sayHelloAsync("Ahmad")).resolves.toBe("Hello Ahmad");
});

it.concurrent("Concurrent 3",async  () => {
    await expect(sayHelloAsync("Ahmad")).resolves.toBe("Hello Ahmad");
});