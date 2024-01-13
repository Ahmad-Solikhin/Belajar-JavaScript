import sayHello from "../src/sayHello.js";

it('should success because name is decalred', function () {
    expect(sayHello("Gayuh")).toBe("Hello Gayuh");
});

it.failing("Will be error because name is undefined", () => {
    sayHello(undefined);
});

it("Will be error because name is undefined", () => {
    expect(() => sayHello(undefined)).toThrow();
});