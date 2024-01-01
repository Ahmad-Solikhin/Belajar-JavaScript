test("string", () => {
    const name = "Ahmad Solikhin Gayuh Raharjo";

    expect(name).toBe("Ahmad Solikhin Gayuh Raharjo");
    expect(name).toMatch(/Ahmad/);
});