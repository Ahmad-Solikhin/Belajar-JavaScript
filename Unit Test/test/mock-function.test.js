import {calculate, calculateAndReturn} from "../src/sum.js";

it('should calculate', function () {
    const callback = jest.fn();

    calculate([10, 10, 10], callback);
    calculate([10, 10, 10, 10, 10], callback);

    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.calls[0][0]).toBe(30);
    expect(callback.mock.calls[1][0]).toBe(50);
});

it('should mock return value', function () {
    const callback = jest.fn();
    callback.mockReturnValueOnce(40);
    callback.mockReturnValueOnce(80);

    expect(calculateAndReturn([10, 10, 10], callback)).toBe(40);
    expect(calculateAndReturn([10, 10, 10, 10], callback)).toBe(80);

    expect(callback.mock.results[0].value).toBe(40);
    expect(callback.mock.results[1].value).toBe(80);
});

it('should mock return value implementation', function () {
    const callback = jest.fn();
    callback.mockImplementation((total) => {
        return 2 * total;
    });

    calculateAndReturn([10, 10, 10], callback);
    calculateAndReturn([10, 10, 10, 10], callback);

    expect(callback.mock.results[0].value).toBe(60);
    expect(callback.mock.results[1].value).toBe(80);

});