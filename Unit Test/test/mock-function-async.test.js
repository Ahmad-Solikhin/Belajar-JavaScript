import {getBalance} from "../src/async.js";

it('should mock async function', async function () {
    const from = jest.fn();
    from.mockResolvedValueOnce(1000);

    await getBalance("Gayuh", from);

    expect(from.mock.calls.length).toBe(1);
    await expect(from.mock.results[0].value).resolves.toBe(1000);
});

it.failing('should failling`', async function () {
    const from = jest.fn();
    from.mockRejectedValue(new Error("Ups"));

    await getBalance("Gayuh", from);
});