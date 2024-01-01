test("to be test", () => {
    const name = "Gayuh";
    const hello = `Hello ${name}`;

    expect(hello).toBe("Hello Gayuh");
});

test("to equal test", () => {
    const hobbies = [
        "Sleep",
        "Lay on the floor"
    ];
    const person = {
        name: "Gayuh",
        age: 22
    }
    Object.assign(person, {hobbies});

    expect(person).toEqual({
        name: "Gayuh",
        age: 22,
        hobbies
    });
});