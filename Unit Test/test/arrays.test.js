test("array simple", () => {
    const names = ["Ahmad", "Solikhin", "Gayuh", "Raharjo"];
    expect(names).toEqual(["Ahmad", "Solikhin", "Gayuh", "Raharjo"]);
    expect(names).toContain("Gayuh");
});

test("array object", () => {
    const persons = [{name: "Gayuh"}, {name: "Raharjo"}];
    expect(persons).toEqual([{name: "Gayuh"}, {name: "Raharjo"}]);
    expect(persons).toContainEqual({name: "Gayuh"});
});