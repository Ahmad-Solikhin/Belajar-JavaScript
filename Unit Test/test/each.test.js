import {sum} from "../src/sum.js";

const generalTestSum = (number1, number2, result) => {
    expect(sum(number1, number2)).toBe(result);
}

it("Test 1", () => {
    generalTestSum(10, 5, 15);
});

it("Test 2", () => {
    generalTestSum(10, 10, 20);
});

//Jadi each nya itu ngeloop data array yang telah dibuat sebelumnya dan nant digunakan method each setelah it atau test
//Bisa juga menggunakan object di array nya

const table = [
    [1, 2, 3],
    [10, 2, 12],
    [12, 8, 20]
];

it.each(table)("test sum(%i, %i) should result %i", (num1, num2, result) => {
    expect(sum(num1, num2)).toBe(result);
});

const objects = [
    {numbers: [1, 2], expected: 3},
    {numbers: [10, 15], expected: 25},
    {numbers: [15, 20], expected: 35}
];

it.each(objects)("Test sum ($numbers) should get $expected", ({numbers, expected}) => {
    expect(sum(numbers[0], numbers[1])).toBe(expected);
});